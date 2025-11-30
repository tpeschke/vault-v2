import query from "../../../db/database";

const allUsersCharacters = `select o.characterID as id, name, ancestry, class, subclass, level from v2GeneralInfo gi
join v2CharacterPages p on p.id = gi.pageID
join v2CharacterOwner o on o.characterID = p.characterID
where ownerID = $1
order by index`

export default async function getV2Characters(userID: number) {
    return query(allUsersCharacters, userID)
}