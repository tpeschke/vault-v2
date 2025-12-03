import query from "../../../../../../../db/database"

const deleteGoalsSQL = `delete from v2goals where pageID = $1`

export default async function deleteGoals(pageID: number) {
    return query(deleteGoalsSQL, pageID)
}