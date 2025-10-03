import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { FavorInfoKeys, NerveAndVitalityObjectKeys, VitalityNNerveCalcInfoKeys, Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";

export function toggleIsThrownUtility(character: CharacterVersion1) {
    const [weaponOne, weaponTwo, weaponThree, weaponFour] = character.pageTwoInfo.combatWorkspaceInfo.weaponInfo

    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                weaponInfo: [
                    weaponOne, weaponTwo, weaponThree,
                    {
                        ...weaponFour,
                        isThrown: !weaponFour.isThrown
                    }
                ]
            }
        }
    }
}

export function updateFavorInfoUtility(character: CharacterVersion1, key: FavorInfoKeys, value: number | boolean) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                favorInfo: {
                    ...character.pageOneInfo.rightColumnInfo.favorInfo,
                    [key]: value
                }
            }
        }
    }
}

export function updateVitalityNNerveUtility(character: CharacterVersion1, key: VitalityNNerveCalcInfoKeys, value: number | string) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                nerveAndVitalityInfo: {
                    ...character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo,
                    vitalityNNerveCalcInfo: {
                        ...character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo.vitalityNNerveCalcInfo,
                        [key]: value
                    }
                }
            }
        }
    }
}

export function updateMaxRangeUtility(character: CharacterVersion1, value: number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                maxRange: value
            }
        }
    }
}

export function updateNerveAndVitalityInfoUtility(character: CharacterVersion1, key: NerveAndVitalityObjectKeys, value: number) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                nerveAndVitalityInfo: {
                    ...character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo,
                    [key]: value
                }
            }
        }
    }
}

export function insertWoundUtility(character: CharacterVersion1, newWound: Wound) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                nerveAndVitalityInfo: {
                    ...character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo,
                    wounds: [
                        ...character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo.wounds,
                        newWound
                    ]
                }
            }
        }
    }
}

export function updateWoundUtility(character: CharacterVersion1, changedIndex: number, newWound: Wound) {
    const alteredArray = alterCharacteristicArray(character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo.wounds, changedIndex, newWound)

    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                nerveAndVitalityInfo: {
                    ...character.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo,
                    wounds: alteredArray
                }
            }
        }
    }
}

function alterCharacteristicArray(woundArray: Wound[], changedIndex: number, newWound: Wound) {
    if (newWound.severity || newWound.days) {
        return woundArray.map((object, index) => {
            if (index === changedIndex) {
                return newWound
            }
            return object
        })
    }

    return woundArray.filter((_, index) => index !== changedIndex)
}
