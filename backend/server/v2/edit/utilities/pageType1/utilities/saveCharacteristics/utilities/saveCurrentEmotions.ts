import { Emotion } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2currentEmotions where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2currentEmotions set value = $1, rank = $2 where id = $3`
const insertSQL = `insert into v2currentEmotions (pageID, value, rank) values ($1, $2, $3)`

export default async function saveCurrentEmotions(pageID: number, emotions: Emotion[]) {
    await query(deleteSQL, [pageID, [0, ...emotions.map(emotion => emotion.id)]])
    return Promise.all(emotions.map(({ id, value }, index) => {
        if (id) {
            return query(updateSQL, [value, index, id])
        }
        if (value) {
            return query(insertSQL, [pageID, value, index])
        }
        return Promise.resolve()
    }))
}
