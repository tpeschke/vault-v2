import { Page4 } from "@vault/common/interfaces/v2/pageTypes"
import addPageType4 from "../../add/pageType4/addPageType4"
import query from "../../../db/database"
import savePageType4 from "./pageType4/savePageType4"

const existingPageSQL = `select id from v2CharacterPages where id = $1 and characterID = $2`
const updatePageIndexSQL = `update v2CharacterPages set index = $1 where id = $2`
const insertPageType4SQL = `insert into v2CharacterPages (index, pageTypeID, characterID) values ($1, $2, $3) returning id`

export default async function persistPageType4(characterID: number, page: Page4, arrayIndex: number): Promise<void> {
    if (page.pageID > 0) {
        const existing = await query(existingPageSQL, [page.pageID, characterID])
        if (existing.length) {
            await query(updatePageIndexSQL, [arrayIndex, page.pageID])
            await savePageType4(page)
            return
        }
    }

    const minted = await query(insertPageType4SQL, [arrayIndex, 4, characterID])
    const id = minted[0]?.id
    if (typeof id !== 'number' || id <= 0) {
        throw new Error('persistPageType4: insert returned no id')
    }
    await addPageType4(id)
    await savePageType4({ ...page, pageID: id })
}
