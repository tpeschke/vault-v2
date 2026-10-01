import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { AbilitiesNBurdensInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";

export function updateAbilitiesUtility(character: CharacterVersion1, key: AbilitiesNBurdensInfoKeys, value: string) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            abilitiesNBurdensInfo: {
                ...character.pageOneInfo.abilitiesNBurdensInfo,
                [key]: value
            }
        }
    }
}