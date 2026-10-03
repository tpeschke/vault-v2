import query from "../../../db/database";

const allUsersCharacters = `select o.characterID as id, name, ancestry, class, subclass, level,
  coalesce((
    select array_agg(gi2.name order by p3.index)
    from v2CharacterPages p3
    join v2GeneralInfo gi2 on gi2.pageID = p3.id
    where p3.characterID = p.characterID
      and p3.pageTypeID = 1
      and p3.id <> p.id
  ), '{}') as "otherPageType1Names"
from v2GeneralInfo gi
join v2CharacterPages p on p.id = gi.pageID
join v2CharacterOwner o on o.characterID = p.characterID
where ownerID = $1
  and p.pageTypeID = 1
  and p.index = (
    select min(p2.index) from v2CharacterPages p2
    where p2.characterID = p.characterID and p2.pageTypeID = 1
  )
order by name`

export default async function getV2Characters(userID: number) {
    return query(allUsersCharacters, userID)
}