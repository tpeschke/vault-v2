export default {
    allDamageOne: "delete from damageone where characterid = $1",
    allDamageTwo: "delete from damagetwo where characterid = $1",
    allSkills: "delete from cvcombatskills where characterid = $1",
    allSuites: "delete from cvcharactercombatskillsuites where characterid = $1"
}