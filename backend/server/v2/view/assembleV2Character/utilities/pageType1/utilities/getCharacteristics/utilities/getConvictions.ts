import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

const getConvictionsSQL = `select * from v2convictions where pageID = $1`

export default async function getConvictions(pageID: number): Promise<CharacteristicPair[]> {
    const info: CharacteristicPair[] = await query(getConvictionsSQL, pageID)

    if (info.length > 0) {
        return info
    }

    return []
}