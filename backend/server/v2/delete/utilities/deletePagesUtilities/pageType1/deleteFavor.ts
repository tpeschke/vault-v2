import query from "../../../../../db/database"

const deleteFavorSQL = `delete from v2Favor where pageID = $1`

export default async function deleteFavor(pageID: number) {
    return query(deleteFavorSQL, pageID)
}