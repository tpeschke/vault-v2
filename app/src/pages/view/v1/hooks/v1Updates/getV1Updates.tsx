import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { SetCharacterInfoFunction, QuickSavingWithActionFunction, QuickSavingFunction } from "../interfaces/CharacterHookInterfaces";
import getPage1Updates from "./utilities/getPage1Updates";
import { PageOneLeftColumn, PageOneRightColumn } from "../interfaces/pageOneInterfaces/UpdateExportInterfaces";
import { UpdateAbilitiesFunction } from "../interfaces/pageOneInterfaces/UpdateRightColumnInterfaces";

interface GetV1UpdatesReturn {
    pageOneUpdateFunctions: {
        leftColumnUpdateFunctions: PageOneLeftColumn,
        rightColumnUpdateFunctions: PageOneRightColumn,
        updateAbilities: UpdateAbilitiesFunction
    } 
}

export default function getV1Updates(
    character: CharacterVersion1 | null,
    setCharacterInfo: SetCharacterInfoFunction,
    quickSavingWithAction: QuickSavingWithActionFunction,
    quickBasicQuickSaving: QuickSavingFunction
): GetV1UpdatesReturn {
    return {
        pageOneUpdateFunctions: getPage1Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving)
    }
}