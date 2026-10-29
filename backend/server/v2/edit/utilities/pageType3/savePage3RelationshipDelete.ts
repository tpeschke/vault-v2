import query from "../../../../db/database"

const deleteSQL = `delete from v2Page3Relationships where id = $1 and pageID = $2`

export default async function savePage3RelationshipDelete(pageID: number, id: number): Promise<void> {
    await query(deleteSQL, [id, pageID])
}
