import { Description } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

interface DescriptionReturn {
    id: number,
    pageid: number,
    label?: string | null,
    attackemotion?: string | null,
    defenseemotion?: string | null,
    rank?: number | null
}

const getDescriptionsSQL = `select * from v2descriptions where pageID = $1`

export default async function getDescriptions(pageID: number): Promise<Description[]> {
    const info: DescriptionReturn[] = await query(getDescriptionsSQL, pageID)

    if (info.length > 0) {
        return info.map(({ id, label, attackemotion, defenseemotion, rank }) => {
            return {
                id,
                label: label ?? '',
                attackEmotion: attackemotion ?? '',
                defenseEmotion: defenseemotion ?? '',
                rank: rank === null || rank === undefined ? '' : rank
            }
        })
    }

    return []
}
