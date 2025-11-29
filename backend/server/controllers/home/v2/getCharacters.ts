import query from "../../../db/database";

const allUsersCharacters = `select gi.characterID as id, name, ancestry, class, subclass, level from v2GeneralInfo gi
where characterID in (
	select characterID from v2CharacterOwner
	where ownerID = $1
)`

export default async function getV2Characters(userID: number) {
    return query(allUsersCharacters, userID)
}