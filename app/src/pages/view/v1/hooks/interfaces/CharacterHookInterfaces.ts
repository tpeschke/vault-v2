import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { PageOneUpdates } from "./pageOneInterfaces/UpdateExportInterfaces"

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