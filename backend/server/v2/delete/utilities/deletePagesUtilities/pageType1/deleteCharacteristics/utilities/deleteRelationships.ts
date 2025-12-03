import query from "../../../../../../../db/database"

const deleteRelationshipsSQL = `delete from v2Relationships where pageID = $1`

export default async function deleteRelationships(pageID: number) {
    return query(deleteRelationshipsSQL, pageID)
}