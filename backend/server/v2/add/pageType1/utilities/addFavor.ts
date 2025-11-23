import query from "../../../../db/database"

const addFavorSQL = `insert into v2Favor (characterID) values ($1)`

export default async function addFavor(characterID: number) {
    return query(addFavorSQL, characterID)
}