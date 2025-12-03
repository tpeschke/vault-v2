import query from "../../../db/database"

const deleteFromOwnerSQL = `delete from v2CharacterOwner where characterID = $1`

export default async function deleteFromOwner(characterID: number) {
    return query(deleteFromOwnerSQL, characterID)
}