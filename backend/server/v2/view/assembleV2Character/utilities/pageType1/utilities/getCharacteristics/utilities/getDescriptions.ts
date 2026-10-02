import { Description } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

interface DescriptionReturn {
    id: number,
    pageid: number,
    value: string
}

const getDescriptionsSQL = `select * from v2descriptions where pageID = $1`

export default async function getDescriptions(pageID: number): Promise<Description[]> {
    const info: DescriptionReturn[] = await query(getDescriptionsSQL, pageID)

    if (info.length > 0) {
        return info.map(({ id, value }) => {
            return {
                id, value
            }
        })
    }

    return []
}
