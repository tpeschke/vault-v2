import query from "../../../db/database"
import deletePageType1 from "./deletePagesUtilities/deletePageType1"

const getPagesSQL = `select * from v2CharacterPages where characterID = $1`

interface Page {
    pagetypeid: number
}

export default async function deletePages(characterID: number) {
    const pages: Page[] = await query(getPagesSQL, characterID)

    return pages.map(({ pagetypeid: pageTypeID }) => {
        switch (pageTypeID) {
            case 1:
                return deletePageType1(characterID)
            default:
                return true
        }
    })
}