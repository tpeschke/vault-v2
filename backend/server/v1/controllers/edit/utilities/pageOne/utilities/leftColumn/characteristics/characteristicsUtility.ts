import { CharacteristicInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { saveIntegrityInfo } from "./integrityInfo"
import { saveGoals } from "./goalInfo"
import { saveDescriptions } from "./descriptionInfo"
import { saveConvictions } from "./convictionInfo"
import { saveRelationships } from "./relationshipInfo"
import { saveFlaws } from "./flawsInfo"
import { saveReputations } from "./reputationInfo"

export async function saveCharacteristics(characterID: number, characteristicInfo: CharacteristicInfo) {
    const { integrityInfo, goals, descriptions, convictions, relationships, flaws, reputation } = characteristicInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveIntegrityInfo(characterID, integrityInfo))
    // culturalStrength
    // assets

    promiseArray.push(saveGoals(characterID, goals))
    promiseArray.push(saveFlaws(characterID, flaws))
    promiseArray.push(saveReputations(characterID, reputation))

    promiseArray.push(saveDescriptions(characterID, descriptions))
    promiseArray.push(saveConvictions(characterID, convictions))
    promiseArray.push(saveRelationships(characterID, relationships))

    return Promise.all(promiseArray)
}