import { LeftColumnInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { saveStatInfo } from "./statInfo";
import { saveMovementInfo } from "./movementInfo";
import { saveCharacteristics } from "./characteristics/characteristicsUtility";

export async function saveLeftColumnInfo(characterID: number, leftColumnInfo: LeftColumnInfo) {
    const { statInfo, movementInfo, characteristicInfo } = leftColumnInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveStatInfo(characterID, statInfo))
    promiseArray.push(saveMovementInfo(characterID, movementInfo))
    promiseArray.push(saveCharacteristics(characterID, characteristicInfo))

    return Promise.all(promiseArray)
}