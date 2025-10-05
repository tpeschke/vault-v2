import { RightColumnInfo } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import { saveMaxRange } from "./maxRange"
import { saveFavorInfo } from "./favorInfo"
import { saveNerveAndVitalityInfo } from "./nerveNVitality/nerveNVitalityInfo"

export async function saveRightColumnInfo(characterID: number, rightColumnInfo: RightColumnInfo) {
    const { maxRange, favorInfo, nerveAndVitalityInfo } = rightColumnInfo

    let promiseArray: Promise<any>[] = []
    
    promiseArray.push(saveMaxRange(characterID, maxRange))
    promiseArray.push(saveFavorInfo(characterID, favorInfo))
    promiseArray.push(saveNerveAndVitalityInfo(characterID, nerveAndVitalityInfo))

    return Promise.all(promiseArray)
}