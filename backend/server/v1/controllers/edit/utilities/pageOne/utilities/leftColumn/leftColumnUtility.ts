import { LeftColumnInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { saveStatInfo } from "./statInfo";
import { saveMovementInfo } from "./movementInfo";

export async function saveLeftColumnInfo(characterID: number, leftColumnInfo: LeftColumnInfo) {
    const { statInfo, movementInfo } = leftColumnInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveStatInfo(characterID, statInfo))
    promiseArray.push(saveMovementInfo(characterID, movementInfo))

    return Promise.all(promiseArray)
}