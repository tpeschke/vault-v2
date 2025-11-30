import query from "../../../../db/database"

const addMovementsSQL = `insert into v2movements (pageID) values ($1)`

export default async function addMovements(pageID: number) {
    return query(addMovementsSQL, pageID)
}