import { Page2 } from "@vault/common/interfaces/v2/pageTypes"
import addPageType2 from "../../add/pageType2/addPageType2"
import query from "../../../db/database"
import savePageType2 from "./pageType2/savePageType2"

const existingPageSQL = `select id from v2CharacterPages where id = $1 and characterID = $2`
const updatePageIndexSQL = `update v2CharacterPages set index = $1 where id = $2`
const insertPageType2SQL = `insert into v2CharacterPages (index, pageTypeID, characterID) values ($1, $2, $3) returning id`

export default async function persistPageType2(characterID: number, page: Page2, arrayIndex: number): Promise<void> {
    if (page.pageID > 0) {
        const existing = await query(existingPageSQL, [page.pageID, characterID])
        if (existing.length) {
            await query(updatePageIndexSQL, [arrayIndex, page.pageID])
            await savePageType2(page)
            return
        }
    }

    const minted = await query(insertPageType2SQL, [arrayIndex, 2, characterID])
    const id = minted[0]?.id
    if (typeof id !== 'number' || id <= 0) {
        throw new Error('persistPageType2: insert returned no id')
    }
    await addPageType2(id)
    await savePageType2({ ...page, pageID: id })
}
