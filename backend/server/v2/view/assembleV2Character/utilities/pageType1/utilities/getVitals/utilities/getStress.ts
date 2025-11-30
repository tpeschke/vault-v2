import { Stress } from "@vault/common/interfaces/v2/page1/vitals"
import query from "../../../../../../../../db/database"

interface StressReturn {
    id: number,
    dieindex: 0,
    stress: 0,
    threshold: 0
}

const getStressSQL = `select * from v2Stress where pageID = $1`

export default async function getStress(pageID: number): Promise<Stress> {
    const [info]: StressReturn[] = await query(getStressSQL, pageID)

    if (info) {
        const { dieindex: dieIndex, threshold, stress } = info
        return {
            dieIndex, threshold, stress
        }
    }

    return {
        dieIndex: 0,
        stress: 0,
        threshold: 0
    }
}