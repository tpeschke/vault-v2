import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

const getConvictionsSQL = `select * from v2convictions where characterID = $1`

export default async function getConvictions(characterID: number): Promise<CharacteristicPair[]> {
    const info: CharacteristicPair[] = await query(getConvictionsSQL, characterID)

    if (info.length > 0) {
        return info
    }

    return []
}