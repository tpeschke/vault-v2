import { RightColumnInfo } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import { saveMaxRange } from "./maxRange"

export async function saveRightColumnInfo(characterID: number, rightColumnInfo: RightColumnInfo) {
    const { maxRange } = rightColumnInfo

    let promiseArray: Promise<any>[] = []
    
    promiseArray.push(saveMaxRange(characterID, maxRange))

    return Promise.all(promiseArray)
}