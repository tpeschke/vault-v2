import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { GeneralNotesInfoKeys } from "@vault/common/interfaces/v1/pageThree/generalNotesInterfaces"
import { SetCharacterInfoFunction, QuickSavingFunction } from "../../interfaces/CharacterHookInterfaces"
import { updateNotesUtility } from "../../utilities/updateUtilities/noteUtilities"
import { UpdateNotesFunction } from "../../interfaces/pageThreeInterfaces/generalNotesInterfaces"

export default function getPage3Updates(
    character: CharacterVersion1 | null,
    setCharacterInfo: SetCharacterInfoFunction,
    quickBasicQuickSaving: QuickSavingFunction
): UpdateNotesFunction {
    function updateNotes(key: GeneralNotesInfoKeys, value: string | boolean) {
        if (character) {
            setCharacterInfo(updateNotesUtility(character, key, value))

            if (typeof value === 'string') {
                quickBasicQuickSaving(['notes'], character.id, key, value)
            }
        }
    }

    return updateNotes
}