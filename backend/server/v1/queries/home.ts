export default {
    allUsersCharacters: "select id, name, level, race, primarya, secondarya from cvcharactermain where userId = $1 order by name",
    deleteCharacter: "delete from cvcharactermain where userid = $1 and id = $2",
    characterUser: "select userid from cvcharactermain where id = $1",
    insertCharacter: "insert into cvcharactermain (name, userid) values ('New Character', $1) returning id",
    characterCount: "select count(*) from cvcharactermain c where userid = 1"
}