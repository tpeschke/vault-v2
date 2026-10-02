import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const saveBasicCharacteristicsSQL = `update v2BasicCharacteristics set capacity = $1, culturalStrength = $2, socialSkillDiscount = $3, affability = $4, openness = $5, outgoingness = $6, workEthic = $7, worry = $8 where pageID = $9`

export default async function saveBasicCharacteristics(pageID: number, characteristics: Characteristics) {
    const { capacity, culturalStrength, socialSkillDiscount, temperaments } = characteristics
    const { affability, openness, outgoingness, workEthic, worry } = temperaments
    return query(saveBasicCharacteristicsSQL, [capacity, culturalStrength, socialSkillDiscount, affability, openness, outgoingness, workEthic, worry, pageID])
}
