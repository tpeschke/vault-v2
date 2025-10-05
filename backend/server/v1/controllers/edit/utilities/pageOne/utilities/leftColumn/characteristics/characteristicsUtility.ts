import { CharacteristicInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { saveIntegrityInfo } from "./integrityInfo"

export async function saveCharacteristics(characterID: number, characteristicInfo: CharacteristicInfo) {
    const { integrityInfo } = characteristicInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveIntegrityInfo(characterID, integrityInfo))

    return Promise.all(promiseArray)
}