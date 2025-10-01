import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { CharacteristicPairObjectsKeys, CharacteristicStringKeys, IntegrityKeys, MovementKeys, PairObject, StatKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
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

export function updateIntegrityInfoUtility(character: CharacterVersion1, key: IntegrityKeys, value: number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                characteristicInfo: {
                    ...character.pageOneInfo.leftColumnInfo.characteristicInfo,
                    integrityInfo: {
                        ...character.pageOneInfo.leftColumnInfo.characteristicInfo.integrityInfo,
                        [key]: value
                    }
                }
            }
        }
    }
}

export function updateCharacteristicStringUtility(character: CharacterVersion1, key: CharacteristicStringKeys, value: number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                characteristicInfo: {
                    ...character.pageOneInfo.leftColumnInfo.characteristicInfo,
                    [key]: value
                }
            }
        }
    }
}

export function insertCharacteristicUtility(character: CharacterVersion1, characteristic: CharacteristicPairObjectsKeys, newObject: PairObject) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                characteristicInfo: {
                    ...character.pageOneInfo.leftColumnInfo.characteristicInfo,
                    [characteristic]: [
                        ...character.pageOneInfo.leftColumnInfo.characteristicInfo[characteristic],
                        newObject
                    ]
                }
            }
        }
    }
}

export function updateCharacteristicUtility(character: CharacterVersion1, characteristic: CharacteristicPairObjectsKeys, changedIndex: number, newObject: PairObject) {
    const alteredArray = alterCharacteristicArray(character.pageOneInfo.leftColumnInfo.characteristicInfo[characteristic], changedIndex, newObject)

    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                characteristicInfo: {
                    ...character.pageOneInfo.leftColumnInfo.characteristicInfo,
                    [characteristic]: alteredArray
                }
            }
        }
    }
}

export function alterCharacteristicArray(characteristicArray: PairObject[], changedIndex: number, newObject: PairObject) {
    if ((newObject.title && newObject.title !== '') || newObject.value !== '') {
        return characteristicArray.map((object, index) => {
            if (index === changedIndex) {
                return newObject
            }
            return object
        })
    }

    return characteristicArray.filter((_, index) => index !== changedIndex)
}
