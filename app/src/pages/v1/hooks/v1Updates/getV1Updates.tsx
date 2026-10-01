import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { SetCharacterInfoFunction, QuickSavingWithActionFunction, QuickSavingFunction } from "../interfaces/CharacterHookInterfaces";
import getPage1Updates from "./utilities/getPage1Updates";
import { PageOneLeftColumn, PageOneRightColumn } from "../interfaces/pageOneInterfaces/UpdateExportInterfaces";
import { UpdateAbilitiesFunction } from "../interfaces/pageOneInterfaces/UpdateRightColumnInterfaces";
import { PageTwoUpdates } from "../interfaces/pageTwoInterfaces/UpdateExportInterfaces";
import getPage2Updates from "./utilities/getPage2Updates";
import { UpdateNotesFunction } from "../interfaces/pageThreeInterfaces/generalNotesInterfaces";
import getPage3Updates from "./utilities/getPage3Updates";

interface GetV1UpdatesReturn {
    pageOneUpdateFunctions: {
        leftColumnUpdateFunctions: PageOneLeftColumn,
        rightColumnUpdateFunctions: PageOneRightColumn,
        updateAbilities: UpdateAbilitiesFunction
    },
    pageTwoUpdateFunctions: PageTwoUpdates,
    updateNotes: UpdateNotesFunction
}

export default function getV1Updates(
    character: CharacterVersion1 | null,
    setCharacterInfo: SetCharacterInfoFunction,
    quickSavingWithAction: QuickSavingWithActionFunction,
    quickBasicQuickSaving: QuickSavingFunction
): GetV1UpdatesReturn {
    return {
        pageOneUpdateFunctions: getPage1Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving),
        pageTwoUpdateFunctions: getPage2Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving),
        updateNotes: getPage3Updates(character, setCharacterInfo, quickBasicQuickSaving)
    }
}