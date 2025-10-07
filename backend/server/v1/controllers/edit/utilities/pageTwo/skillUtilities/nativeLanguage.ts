import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import query from "../../../../../../db/database"

const saveNativeLanguageSQL = 'update cvnativelanguage set language = $1, rank = $2 where nativeid = $3 and characterid = $4'

export async function saveNativeLanguage(characterID: number, nativeLanguage: SkillObject) {
    const { id, skill, rank } = nativeLanguage
    return query(saveNativeLanguageSQL, [skill, rank, id, characterID])
}
