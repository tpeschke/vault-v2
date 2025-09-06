export default {
    allUsersCharacters: "select id, name, level, race, primarya, secondarya from cvcharactermain where userId = $1 order by name",
    deleteCharacter: "delete from cvcharactermain where userid = $1 and id = $2",
    characterUser: "select userid from cvcharactermain where id = $1"
}