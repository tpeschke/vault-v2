import query from "../../../../../../../db/database"

const saveMartialAdeptSQL = 'update cvcharactermain set martialadept = $1 where id = $2'

export async function saveMartialAdept(characterID: number, martialAdepts: number) {
    return query(saveMartialAdeptSQL, [martialAdepts, characterID])
}