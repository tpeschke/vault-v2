import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { UpdateGeneralInfoFunction, UpdateStatFunction, UpdateMovementFunction, CharacteristicUpdateFunctions } from "./UpdateCharacteristicInterfaces"
import { ToggleIsThrownFunction } from "./UpdateWeaponInterfaces"

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
    rightColumnUpdateFunctions: PageOneRightColumn
}

export interface PageOneLeftColumn {
    updateStat: UpdateStatFunction,
    updateMovement: UpdateMovementFunction,
    characteristicUpdateFunctions: CharacteristicUpdateFunctions
}

export interface PageOneRightColumn {
    toggleIsThrown: ToggleIsThrownFunction
}