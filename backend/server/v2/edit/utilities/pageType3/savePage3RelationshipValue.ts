import query from "../../../../db/database"

const updateSQL = `update v2Page3Relationships set value = $1 where id = $2 and pageID = $3`

export default async function savePage3RelationshipValue(pageID: number, id: number, value: string): Promise<void> {
    await query(updateSQL, [value, id, pageID])
}
