import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import addPageType3 from "../../add/pageType3/addPageType3"
import query from "../../../db/database"
import savePageType3 from "./pageType3/savePageType3"

const existingPageSQL = `select id from v2CharacterPages where id = $1 and characterID = $2`
const updatePageIndexSQL = `update v2CharacterPages set index = $1 where id = $2`
const insertPageType3SQL = `insert into v2CharacterPages (index, pageTypeID, characterID) values ($1, $2, $3) returning id`

export default async function persistPageType3(characterID: number, page: Page3, arrayIndex: number): Promise<void> {
    if (page.pageID > 0) {
        const existing = await query(existingPageSQL, [page.pageID, characterID])
        if (existing.length) {
            await query(updatePageIndexSQL, [arrayIndex, page.pageID])
            await savePageType3(page)
            return
        }
    }

    const minted = await query(insertPageType3SQL, [arrayIndex, 3, characterID])
    const id = minted[0]?.id
    if (typeof id !== 'number' || id <= 0) {
        throw new Error('persistPageType3: insert returned no id')
    }
    await addPageType3(id)
    await savePageType3({ ...page, pageID: id })
}
