import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2reputations where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2reputations set value = $1, rank = $2 where id = $3`
const insertSQL = `insert into v2reputations (pageID, value, rank) values ($1, $2, $3)`

export default async function saveReputations(pageID: number, reputations: CharacteristicPair[]) {
    await query(deleteSQL, [pageID, [0, ...reputations.map(reputation => reputation.id)]])
    return Promise.all(reputations.map(({ id, value, rank }) => {
        if (id) {
            return query(updateSQL, [value, rank, id])
        }
        if (value || rank) {
            return query(insertSQL, [pageID, value, rank])
        }
        return Promise.resolve()
    }))
}
