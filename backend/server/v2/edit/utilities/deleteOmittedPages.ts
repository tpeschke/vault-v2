import { PageV2 } from "@vault/common/interfaces/v2/pageTypes"
import query from "../../../db/database"
import deletePageType1 from "../../delete/utilities/deletePagesUtilities/deletePageType1"
import deletePageType2 from "../../delete/utilities/deletePagesUtilities/pageType2/deletePageType2"
import deletePageType3 from "../../delete/utilities/deletePagesUtilities/pageType3/deletePageType3"
import deletePageType4 from "../../delete/utilities/deletePagesUtilities/pageType4/deletePageType4"

const listPagesSQL = `select id, pageTypeID from v2CharacterPages where characterID = $1`
const deletePageRowSQL = `delete from v2CharacterPages where id = $1 and characterID = $2`

interface StoredPage {
    id: number
    pagetypeid: number
}

function postedKeptIDs(pages: PageV2[]): Set<number> {
    const kept = new Set<number>()
    pages.forEach(page => {
        if ('pageID' in page && page.pageID > 0) {
            kept.add(page.pageID)
        }
    })
    return kept
}

export async function omittedPageIDs(characterID: number, pages: PageV2[]): Promise<number[]> {
    const stored: StoredPage[] = await query(listPagesSQL, characterID)
    const kept = postedKeptIDs(pages)
    return stored
        .filter(row => row.pagetypeid >= 1 && row.pagetypeid <= 4 && !kept.has(row.id))
        .map(row => row.id)
}

export async function deleteOmittedPages(characterID: number, omittedIDs: number[]): Promise<void> {
    const stored: StoredPage[] = await query(listPagesSQL, characterID)
    const typeByID = new Map(stored.map(row => [row.id, row.pagetypeid]))
    for (const id of omittedIDs) {
        const pageTypeID = typeByID.get(id)
        if (pageTypeID === 1) {
            await deletePageType1(id)
        } else if (pageTypeID === 2) {
            await deletePageType2(id)
        } else if (pageTypeID === 3) {
            await deletePageType3(id)
        } else if (pageTypeID === 4) {
            await deletePageType4(id)
        } else {
            continue
        }
        await query(deletePageRowSQL, [id, characterID])
    }
}

export async function omittedPagesRemain(characterID: number, omittedIDs: number[]): Promise<boolean> {
    if (omittedIDs.length === 0) {
        return false
    }
    const stored: StoredPage[] = await query(listPagesSQL, characterID)
    const still = new Set(stored.map(row => row.id))
    return omittedIDs.some(id => still.has(id))
}
