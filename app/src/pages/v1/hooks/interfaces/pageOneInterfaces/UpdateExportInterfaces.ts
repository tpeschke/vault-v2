import { UpdateGeneralInfoFunction, UpdateStatFunction, UpdateMovementFunction, CharacteristicUpdateFunctions } from "./UpdateCharacteristicInterfaces"
import { UpdateAbilitiesFunction, UpdateFavorInfoFunction, UpdateVitalityNNerveFunction, UpdateMaxRangeFunction, UpdateNerveAndVitalityInfoFunction, InsertWoundFunction, UpdateWoundFunction } from "./UpdateRightColumnInterfaces"
import { ToggleIsThrownFunction } from "./UpdateWeaponInterfaces"

export interface PageOneUpdates {
    updateGeneralInfo: UpdateGeneralInfoFunction
    leftColumnUpdateFunctions: PageOneLeftColumn,
    rightColumnUpdateFunctions: PageOneRightColumn,
    updateAbilities: UpdateAbilitiesFunction
}

export interface PageOneLeftColumn {
    updateStat: UpdateStatFunction,
    updateMovement: UpdateMovementFunction,
    characteristicUpdateFunctions: CharacteristicUpdateFunctions
}

export interface PageOneRightColumn {
    toggleIsThrown: ToggleIsThrownFunction,
    updateFavorInfo: UpdateFavorInfoFunction,
    updateVitalityNNerve: UpdateVitalityNNerveFunction,
    updateMaxRange: UpdateMaxRangeFunction,
    updateNerveAndVitalityInfo: UpdateNerveAndVitalityInfoFunction,
    insertWound: InsertWoundFunction,
    updateWound: UpdateWoundFunction
}