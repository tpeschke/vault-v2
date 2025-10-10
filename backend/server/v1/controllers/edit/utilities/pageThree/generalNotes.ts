import { GeneralNotesInfo } from "@vault/common/interfaces/v1/pageThree/generalNotesInterfaces"
import query from "../../../../../db/database"

const saveGeneralNotesSQL = 'update cvcharactermain set generalnotes = $1, secretgeneralnotes = $2 where id = $3'

export async function saveGeneralNotes(characterID: number, generalNotesInfo: GeneralNotesInfo) {
    const { notes, isSecret } = generalNotesInfo

    return query(saveGeneralNotesSQL, [notes, isSecret, characterID])
}