import { CharacteristicPair } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

const getRelationshipsSQL = `select * from v2Relationships where pageID = $1`

export default async function getRelationships(pageID: number): Promise<CharacteristicPair[]> {
    const info: CharacteristicPair[] = await query(getRelationshipsSQL, pageID)

    if (info.length > 0) {
        return info
    }

    return []
}