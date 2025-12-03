import query from "../../../../../db/database"

const deleteMovementSQL = `delete from v2movements where pageID = $1`

export default async function deleteMovement(pageID: number) {
    return query(deleteMovementSQL, pageID)
}