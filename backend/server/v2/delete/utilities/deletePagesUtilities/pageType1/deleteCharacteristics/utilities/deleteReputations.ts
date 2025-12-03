import query from "../../../../../../../db/database"

const deleteReputationsSQL = `delete from v2reputations where pageID = $1`

export default async function deleteReputations(pageID: number) {
    return query(deleteReputationsSQL, pageID)
}