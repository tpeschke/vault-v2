import query from "../../../../../db/database"

const deleteStatsSQL = `delete from v2stats where pageID = $1`

export default async function deleteStats(pageID: number) {
    return query(deleteStatsSQL, pageID)
}