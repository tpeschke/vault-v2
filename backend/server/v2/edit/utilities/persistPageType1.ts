import { Page1 } from "@vault/common/interfaces/v2/pageTypes"
import addPageType1 from "../../add/pageType1/addPageType1"
import query from "../../../db/database"
import savePageType1 from "./pageType1/savePageType1"

const existingPageSQL = `select id from v2CharacterPages where id = $1 and characterID = $2`
const updatePageIndexSQL = `update v2CharacterPages set index = $1 where id = $2`
const insertPageType1SQL = `insert into v2CharacterPages (index, pageTypeID, characterID) values ($1, $2, $3) returning id`

export default async function persistPageType1(characterID: number, page: Page1, arrayIndex: number): Promise<void> {
    if (page.pageID > 0) {
        const existing = await query(existingPageSQL, [page.pageID, characterID])
        if (existing.length) {
            await query(updatePageIndexSQL, [arrayIndex, page.pageID])
            await savePageType1(page)
            return
        }
    }

    const minted = await query(insertPageType1SQL, [arrayIndex, 1, characterID])
    const id = minted[0]?.id
    if (typeof id !== 'number' || id <= 0) {
        throw new Error('persistPageType1: insert returned no id')
    }
    await addPageType1(id)
    await savePageType1({ ...page, pageID: id })
}
