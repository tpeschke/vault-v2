import query from "../../../../db/database"

const addStatsSQL = `insert into v2stats (characterID) values ($1)`

export default async function addStats(characterID: number) {
    return query(addStatsSQL, characterID)
}