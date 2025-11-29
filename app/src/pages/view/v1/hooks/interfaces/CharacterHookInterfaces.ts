import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { PageOneUpdates } from "./pageOneInterfaces/UpdateExportInterfaces"
import { PageTwoUpdates } from "./pageTwoInterfaces/UpdateExportInterfaces"
import { UpdateNotes } from "./pageThreeInterfaces/generalNotesInterfaces"

export interface CharacterHookReturn {
    character: CharacterVersion1 | null,
    isQuickSaving: boolean,
    updateFunctions: UpdateFunctions,
    downloadCharacter: DownloadCharacterFunction,
    isDownloading: boolean
}

export type DownloadCharacterFunction = (isPregen: boolean) => void

export interface UpdateFunctions {
    revertCharacter: () => void,
    saveCharacterToBackend: () => void,
    pageOneUpdateFunctions: PageOneUpdates,
    pageTwoUpdateFunctions: PageTwoUpdates,
    updateNotes: UpdateNotes
}