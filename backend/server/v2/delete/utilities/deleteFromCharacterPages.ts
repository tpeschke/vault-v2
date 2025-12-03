import query from "../../../db/database";

const deleteFromCharacterPagesSQL = `delete from v2CharacterPages where characterID = $1`

export default async function deleteFromCharacterPages(characterID: number) {
    return query(deleteFromCharacterPagesSQL, characterID)
}