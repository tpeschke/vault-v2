export default {
    allUsersCharacters: "select id, name, level, race, primarya, secondarya from cvcharactermain where userId = $1 order by name",
}