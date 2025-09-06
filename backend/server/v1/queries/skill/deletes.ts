export default {
    allSkills: "delete from cvskills where characterid = $1",
    allSuites: "delete from cvcharacterskillsuites where characterid = $1"
}