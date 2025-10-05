import { IntegrityInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const saveIntegrityInfoSQL = 'update cvcharactermain set honor = $1, extrahonordice = $2 where id = $3'

export async function saveIntegrityInfo(characterID: number, integrityInfo: IntegrityInfo) {
    const { integrity, gritDie } = integrityInfo

    return query(saveIntegrityInfoSQL, [integrity, gritDie, characterID])
}