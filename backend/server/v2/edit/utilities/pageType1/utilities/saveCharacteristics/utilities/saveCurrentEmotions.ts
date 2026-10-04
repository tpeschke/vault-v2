import { Emotion } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2currentEmotions where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2currentEmotions set value = $1, rank = $2 where id = $3`
const insertSQL = `insert into v2currentEmotions (pageID, value, rank) values ($1, $2, $3) returning id`

export default async function saveCurrentEmotions(pageID: number, emotions: Emotion[]): Promise<Emotion[]> {
    await query(deleteSQL, [pageID, [0, ...emotions.map(emotion => emotion.id)]])
    const saved = await Promise.all(emotions.map(async ({ id, value }, index): Promise<Emotion | null> => {
        if (id) {
            await query(updateSQL, [value, index, id])
            return { id, value }
        }
        if (value) {
            const rows = await query(insertSQL, [pageID, value, index])
            const nextId = rows[0]?.id
            return { id: typeof nextId === 'number' ? nextId : 0, value }
        }
        return null
    }))
    return saved.filter((row): row is Emotion => row !== null)
}
