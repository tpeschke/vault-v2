import { CharacteristicInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { saveIntegrityInfo } from "./integrityInfo"
import { saveGoals } from "./goalInfo"

export async function saveCharacteristics(characterID: number, characteristicInfo: CharacteristicInfo) {
    const { integrityInfo, goals } = characteristicInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveIntegrityInfo(characterID, integrityInfo))
    promiseArray.push(saveGoals(characterID, goals))

    return Promise.all(promiseArray)
}