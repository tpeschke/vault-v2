import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { PageOneUpdates } from "./pageOneInterfaces/UpdateExportInterfaces"
import { PageTwoUpdates } from "./pageTwoInterfaces/UpdateExportInterfaces"

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
    pageOneUpdateFunctions: PageOneUpdates,
    pageTwoUpdateFunctions: PageTwoUpdates
}