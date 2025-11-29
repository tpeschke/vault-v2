import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { PageOneUpdates } from "./pageOneInterfaces/UpdateExportInterfaces"
import { PageTwoUpdates } from "./pageTwoInterfaces/UpdateExportInterfaces"
import { UpdateNotes } from "./pageThreeInterfaces/generalNotesInterfaces"
import { Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import { GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces"
import { ArmorQuickEditModifiers, QuickEditActions, ShieldQuickEditModifiers, WeaponQuickEditModifiers } from "@vault/common/interfaces/v1/quickEdit"

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

export type QuickSavingWithActionFunction = (quickEdit: string[], characterID: number, attribute: string, value: Wound | GearObject, action: QuickEditActions) => Promise<any>
export type QuickSavingFunction = (quickEdit: string[], characterID: number, attribute: string, value: string | number | ArmorQuickEditModifiers | ShieldQuickEditModifiers | WeaponQuickEditModifiers) => Promise<void>

export type SetCharacterInfoFunction = (character: CharacterVersion1 | null) => void
