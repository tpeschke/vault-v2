import { Description } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2descriptions where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2descriptions set value = $1, rank = $2 where id = $3`
const insertSQL = `insert into v2descriptions (pageID, value, rank) values ($1, $2, $3)`

export default async function saveDescriptions(pageID: number, descriptions: Description[]) {
    await query(deleteSQL, [pageID, [0, ...descriptions.map(description => description.id)]])
    return Promise.all(descriptions.map(({ id, value }, index) => {
        if (id) {
            return query(updateSQL, [value, index, id])
        }
        if (value) {
            return query(insertSQL, [pageID, value, index])
        }
        return Promise.resolve()
    }))
}
