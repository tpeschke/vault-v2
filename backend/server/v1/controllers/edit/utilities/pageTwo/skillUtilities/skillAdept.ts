import query from "../../../../../../db/database"

const saveSkillAdeptSQL = 'update cvcharactermain set skilladept = $1 where id = $2'

export async function saveSkillAdept(characterID: number, adept: number) {
    return query(saveSkillAdeptSQL, [adept, characterID])
}