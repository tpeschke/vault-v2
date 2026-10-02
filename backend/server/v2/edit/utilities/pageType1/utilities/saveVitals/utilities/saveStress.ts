import { Stress } from "@vault/common/interfaces/v2/page1/vitals"
import query from "../../../../../../../db/database"

const saveStressSQL = `update v2Stress set dieIndex = $1, stress = $2, threshold = $3 where pageID = $4`

export default async function saveStress(pageID: number, stress: Stress) {
    const { dieIndex, stress: stressValue, threshold } = stress
    return query(saveStressSQL, [dieIndex, stressValue, threshold, pageID])
}
