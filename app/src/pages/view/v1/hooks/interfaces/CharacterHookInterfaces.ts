import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { UpdateGeneralInfoFunction, UpdateStatFunction, UpdateMovementFunction, CharacteristicUpdateFunctions } from "./UpdateCharacteristicInterfaces"
import { ToggleIsThrownFunction } from "./UpdateWeaponInterfaces"
import { InsertWoundFunction, UpdateAbilitiesFunction, UpdateFavorInfoFunction, UpdateMaxRangeFunction, UpdateNerveAndVitalityInfoFunction, UpdateVitalityNNerveFunction, UpdateWoundFunction } from "./UpdateRightColumnInterfaces"

export interface CharacterHookReturn {
    character: CharacterVersion1 | null,
    downloadCharacter: DownloadCharacterFunction,
    isDownloading: boolean,
    updateFunctions: UpdateFunctions
}

export type DownloadCharacterFunction = (isPregen: boolean) => void

export interface UpdateFunctions {
    revertCharacter: () => void,
    saveCharacterToBackend: () => void,
    pageOneUpdateFunction: PageOneUpdates
}

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