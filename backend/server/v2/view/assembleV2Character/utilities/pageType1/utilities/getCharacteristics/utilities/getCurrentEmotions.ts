import { Emotion } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

interface EmotionReturn {
    id: number,
    pageid: number,
    value: string,
    rank: number
}

const getCurrentEmotionsSQL = `select * from v2currentEmotions where pageID = $1 order by rank asc`

export default async function getCurrentEmotions(pageID: number): Promise<Emotion[]> {
    const info: EmotionReturn[] = await query(getCurrentEmotionsSQL, pageID)

    if (info.length > 0) {
        return info.map(({ id, value }) => {
            return {
                id, value
            }
        })
    }

    return []
}
