import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2Relationships where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2Relationships set value = $1, rank = $2 where id = $3`
const insertSQL = `insert into v2Relationships (pageID, value, rank) values ($1, $2, $3)`

export default async function saveRelationships(pageID: number, relationships: CharacteristicPair[]) {
    await query(deleteSQL, [pageID, [0, ...relationships.map(relationship => relationship.id)]])
    return Promise.all(relationships.map(({ id, value, rank }) => {
        if (id) {
            return query(updateSQL, [value, rank, id])
        }
        if (value || rank) {
            return query(insertSQL, [pageID, value, rank])
        }
        return Promise.resolve()
    }))
}
