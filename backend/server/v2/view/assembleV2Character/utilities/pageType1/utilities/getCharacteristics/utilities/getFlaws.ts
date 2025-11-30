import { Flaw } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

interface FlawReturn {
    id: number,
    pageid: number,
    flaw: string
}

const getFlawsSQL = `select * from v2flaws where pageID = $1`

export default async function getFlaws(pageID: number): Promise<Flaw[]> {
    const info: FlawReturn[] = await query(getFlawsSQL, pageID)

    if (info.length > 0) {
        return info.map(({ id, flaw }) => {
            return {
                id, flaw
            }
        })
    }

    return []
}