import query from "../../../../../../../db/database"

const deleteSelfDoubtSQL = `delete from v2SelfDoubt where pageID = $1`

export default async function deleteSelfDoubt(pageID: number) {
    return query(deleteSelfDoubtSQL, pageID)
}