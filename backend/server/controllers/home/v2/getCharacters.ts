import query from "../../../db/database";

const allUsersCharacters = `select pageID as id, name, ancestry, class, subclass, level from v2GeneralInfo gi
where pageID = (
	select id from v2characterpages
	where characterID = (
		select characterID from v2CharacterOwner
		where ownerID = $1
	)
		and pageTypeID = 1
	order by index
	limit 1
)`

export default async function getV2Characters(userID: number) {
    return query(allUsersCharacters, userID)
}