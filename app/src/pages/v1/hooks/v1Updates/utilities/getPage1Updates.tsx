import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { StatKeys, MovementKeys, IntegrityKeys, CharacteristicStringKeys, CharacteristicPairObjectsKeys, PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { AbilitiesNBurdensInfoKeys, GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces"
import { FavorInfoKeys, VitalityNNerveCalcInfoKeys, NerveAndVitalityObjectKeys, Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import { QuickEditActions } from "@vault/common/interfaces/v1/quickEdit"
import { updateIntegrityInfoUtility, updateCharacteristicStringUtility, insertCharacteristicUtility, updateCharacteristicUtility } from "../../utilities/updateUtilities/pageOneUtilities/characteristicUtilities"
import { updateAbilitiesUtility } from "../../utilities/updateUtilities/pageOneUtilities/lowerSectionUtilities"
import { toggleIsThrownUtility, updateFavorInfoUtility, updateVitalityNNerveUtility, updateMaxRangeUtility, updateNerveAndVitalityInfoUtility, updateWoundUtility, insertWoundUtility, updateWoundWithID } from "../../utilities/updateUtilities/pageOneUtilities/rightColumnUtilities"
import { updateStatUtility } from "../../utilities/updateUtilities/pageOneUtilities/updateStatUtility"
import { updateMovementUtility } from "../../utilities/updateUtilities/pageOneUtilities/upperSectionUtilities"
import { QuickSavingFunction, QuickSavingWithActionFunction, SetCharacterInfoFunction } from "../../interfaces/CharacterHookInterfaces"
import { PageOneLeftColumn, PageOneRightColumn } from "../../interfaces/pageOneInterfaces/UpdateExportInterfaces"
import { UpdateAbilitiesFunction } from "../../interfaces/pageOneInterfaces/UpdateRightColumnInterfaces"

export default function getPage1Updates(
    character: CharacterVersion1 | null,
    setCharacterInfo: SetCharacterInfoFunction,
    quickSavingWithAction: QuickSavingWithActionFunction,
    quickBasicQuickSaving: QuickSavingFunction
): {
    leftColumnUpdateFunctions: PageOneLeftColumn,
    rightColumnUpdateFunctions: PageOneRightColumn,
    updateAbilities: UpdateAbilitiesFunction
} {
    function updateStat(key: StatKeys, value: number) {
        if (character) {
            setCharacterInfo(updateStatUtility(character, key, value))
        }
    }

    function updateMovement(key: MovementKeys, value: number) {
        if (character) {
            setCharacterInfo(updateMovementUtility(character, key, value))
        }
    }

    function updateIntegrityInfo(key: IntegrityKeys, value: number) {
        if (character) {
            setCharacterInfo(updateIntegrityInfoUtility(character, key, value))

            quickBasicQuickSaving(['integrity', 'gritDice'], character.id, key, value)
        }
    }

    function updateCharacteristicString(key: CharacteristicStringKeys, value: string) {
        if (character) {
            setCharacterInfo(updateCharacteristicStringUtility(character, key, value))

            quickBasicQuickSaving(['assets'], character.id, key, value)
        }
    }

    function insertCharacteristic(characteristic: CharacteristicPairObjectsKeys) {
        return (newObject: PairObject) => {
            if (character) {
                setCharacterInfo(insertCharacteristicUtility(character, characteristic, newObject))
            }
        }
    }

    function updateCharacteristic(characteristic: CharacteristicPairObjectsKeys) {
        return (changedIndex: number, newObject: PairObject) => {
            if (character) {
                setCharacterInfo(updateCharacteristicUtility(character, characteristic, changedIndex, newObject))
            }
        }
    }

    function toggleIsThrown() {
        if (character) {
            setCharacterInfo(toggleIsThrownUtility(character))
        }
    }

    function updateFavorInfo(key: FavorInfoKeys, value: number | boolean) {
        if (character) {
            setCharacterInfo(updateFavorInfoUtility(character, key, value))

            if (typeof value === 'number') {
                quickBasicQuickSaving(['favor'], character.id, key, value)
            }
        }
    }

    function updateVitalityNNerve(key: VitalityNNerveCalcInfoKeys, value: number | string) {
        if (character) {
            setCharacterInfo(updateVitalityNNerveUtility(character, key, value))
        }
    }

    function updateMaxRange(value: number) {
        if (character) {
            setCharacterInfo(updateMaxRangeUtility(character, value))
        }
    }

    function updateNerveAndVitalityInfo(key: NerveAndVitalityObjectKeys, value: number) {
        if (character) {
            setCharacterInfo(updateNerveAndVitalityInfoUtility(character, key, value))

            quickBasicQuickSaving(['stress', 'relaxation'], character.id, key, value)
        }
    }

    function updateWound(changedIndex: number, newWound: Wound) {
        if (character) {
            setCharacterInfo(updateWoundUtility(character, changedIndex, newWound))

            const action: QuickEditActions = newWound.severity || newWound.days ? 'update' : 'delete'
            quickSavingWithAction(['wound'], character.id, 'wound', newWound, action)
        }
    }

    async function insertWound(newWound: Wound) {
        if (character) {
            const newCharacter = insertWoundUtility(character, newWound)
            setCharacterInfo(newCharacter)

            const { data } = await quickSavingWithAction(['wound'], newCharacter.id, 'wound', newWound, 'add')
            setCharacterInfo(updateWoundWithID(newCharacter, data))
        }
    }

    function updateAbilities(key: AbilitiesNBurdensInfoKeys, value: string) {
        if (character) {
            setCharacterInfo(updateAbilitiesUtility(character, key, value))
        }
    }

    return {
        leftColumnUpdateFunctions: {
            updateStat,
            updateMovement,
            characteristicUpdateFunctions: {
                updateIntegrityInfo,
                insertCharacteristic,
                updateCharacteristic,
                updateCharacteristicString
            }
        },
        rightColumnUpdateFunctions: {
            toggleIsThrown,
            updateFavorInfo,
            updateVitalityNNerve,
            updateMaxRange,
            updateNerveAndVitalityInfo,
            updateWound,
            insertWound,
        },
        updateAbilities
    }
}