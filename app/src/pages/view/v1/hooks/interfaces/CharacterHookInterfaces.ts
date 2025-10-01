import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { InsertGenericCharacteristicFunction, UpdateCharacteristicStringFunction, UpdateGeneralInfoFunction, UpdateGenericCharacteristicFunction, UpdateIntegrityInfo, UpdateMovementFunction, UpdateStatFunction } from "./UpdateCharacterFunctionInterfaces"

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
    leftColumnUpdateFunctions: PageOneLeftColumn
}

export interface PageOneLeftColumn {
    updateStat: UpdateStatFunction,
    updateMovement: UpdateMovementFunction,
    characteristicUpdateFunctions: CharacteristicUpdateFunctions
}

export interface CharacteristicUpdateFunctions {
    updateIntegrityInfo: UpdateIntegrityInfo,
    insertCharacteristic: InsertGenericCharacteristicFunction,
    updateCharacteristic: UpdateGenericCharacteristicFunction,
    updateCharacteristicString: UpdateCharacteristicStringFunction
}