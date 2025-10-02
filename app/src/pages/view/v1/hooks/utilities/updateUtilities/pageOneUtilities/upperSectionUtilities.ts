import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { StatKeys, MovementKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces"

export function updateGeneralInfoUtility(character: CharacterVersion1, key: GeneralInfoKeys, value: string | number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            generalInfo: {
                ...character.pageOneInfo.generalInfo,
                [key]: value
            }
        }
    }
}

export function updateStatUtility(character: CharacterVersion1, key: StatKeys, value: number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                statInfo: {
                    ...character.pageOneInfo.leftColumnInfo.statInfo,
                    [key]: value
                }
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