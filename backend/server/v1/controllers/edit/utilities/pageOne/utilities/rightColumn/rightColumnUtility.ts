import { RightColumnInfo } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import { saveMaxRange } from "./maxRange"
import { saveFavorInfo } from "./favorInfo"

export async function saveRightColumnInfo(characterID: number, rightColumnInfo: RightColumnInfo) {
    const { maxRange, favorInfo } = rightColumnInfo

    let promiseArray: Promise<any>[] = []
    
    promiseArray.push(saveMaxRange(characterID, maxRange))
    promiseArray.push(saveFavorInfo(characterID, favorInfo))

    return Promise.all(promiseArray)
}