import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { FavorInfoKeys, NerveAndVitalityObjectKeys, VitalityNNerveCalcInfoKeys } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";

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
    console.log(value, value)
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