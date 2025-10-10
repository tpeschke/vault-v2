import query from "../../../../../db/database"

const saveRelaxationSQL = 'update cvcharactermain set relaxation = $1 where id = $2'

export async function saveRelaxation(characterID: number, relaxation: number) {
    await query(saveRelaxationSQL, [relaxation, characterID])
    return true
}