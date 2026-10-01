import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { MovementKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces"
import getCrPToNextLevel from "@vault/common/dictionaries/v1/crpToNextLevel"

export function updateGeneralInfoUtility(character: CharacterVersion1, key: GeneralInfoKeys, value: string | number) {
    const newCharacter = {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            generalInfo: {
                ...character.pageOneInfo.generalInfo,
                [key]: value
            }
        }
    }

    return {
        ...newCharacter,
        pageOneInfo: {
            ...newCharacter.pageOneInfo,
            generalInfo: {
                ...newCharacter.pageOneInfo.generalInfo,
                crpToNextLevel: getCrPToNextLevel(newCharacter.pageOneInfo.generalInfo.level)
            }
        }
    }
}

export function updateMovementUtility(character: CharacterVersion1, key: MovementKeys, value: number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                movementInfo: {
                    ...character.pageOneInfo.leftColumnInfo.movementInfo,
                    [key]: value
                }
            }
        }
    }
}