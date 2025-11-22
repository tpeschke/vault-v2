import query from "../../../../db/database"

const addMovementsSQL = `insert into v2movements (characterID) values ($1)`

export default async function addMovements(characterID: number) {
    return query(addMovementsSQL, characterID)
}