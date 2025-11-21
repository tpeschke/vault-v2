import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

const getReputationsSQL = `select * from v2reputations where characterID = $1`

export default async function getReputations(characterID: number): Promise<CharacteristicPair[]> {
    const info: CharacteristicPair[] = await query(getReputationsSQL, characterID)

    if (info.length > 0) {
        return info
    }

    return []
}