import query from "../../../../db/database"

const addStatsSQL = `insert into v2stats (pageID) values ($1)`

export default async function addStats(pageID: number) {
    return query(addStatsSQL, pageID)
}