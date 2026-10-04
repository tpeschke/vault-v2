import query from "../../../../../db/database"

const deleteBasicsSQL = `delete from v2Page3Basics where pageID = $1`
const deleteContactsSQL = `delete from v2Page3Contacts where pageID = $1`
const deleteRelationshipsSQL = `delete from v2Page3Relationships where pageID = $1`
const deleteGearSQL = `delete from v2Page3Gear where pageID = $1`

export default async function deletePageType3(pageID: number) {
    return Promise.all([
        query(deleteBasicsSQL, pageID),
        query(deleteContactsSQL, pageID),
        query(deleteRelationshipsSQL, pageID),
        query(deleteGearSQL, pageID)
    ])
}
