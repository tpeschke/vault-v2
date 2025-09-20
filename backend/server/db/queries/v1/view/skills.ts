export default {
    skillSuites: "select characterskillsuitesid as id, skillsuitename as skill, skillsuitebasecost as cost, trained as istrained, rank from cvcharacterskillsuites cs join cvskillsuites ss on ss.skillsuiteid = cs.skillsuiteid where characterid = $1 order by cs.skillsuiteid",
    nativeLanguage: "select nativeid as id, language as skill, rank, 5 as cost from cvnativelanguage where characterid = $1",
    skills: "select id, skill, cost, rank, mod from cvskills where characterid = $1 order by skill"
}