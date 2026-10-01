import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { GeneralNotesInfoKeys } from "@vault/common/interfaces/v1/pageThree/generalNotesInterfaces";

export function updateNotesUtility(character: CharacterVersion1, key: GeneralNotesInfoKeys, value: string | boolean) {
    return {
        ...character,
        generalNotes: {
            ...character.generalNotes,
            [key]: value
        }
    }
}