import query from "../../../../../../../db/database";

const saveStatInfoSQL = 'update cvcharactermain set maxrange = $1 where id = $2'

export async function saveMaxRange(characterID: number, maxRange: number) {
    return query(saveStatInfoSQL, [maxRange, characterID])
}