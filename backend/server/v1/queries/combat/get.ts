export default {
    armor: "select * from cvarmor where characterid = $1",
    skillSuites: "select characterskillsuitesid as id, skillsuitename as skill, skillsuitebasecost as cost, rank, trained as isTrained from cvcharactercombatskillsuites c join cvcombatskillsuites ss on ss.skillsuiteid = c.combatskillsuiteid where characterid = $1  order by c.combatskillsuiteid",
    skills: 'select id, skill, cost, rank from cvcombatskills where characterid = $1 order by skill',
    shield: "select * from cvshield where characterid = $1",
    weapon1: "select * from weaponone where characterid = $1",
    weapon2: "select * from weapontwo where characterid = $1",
    weapon3: "select * from weaponthree where characterid = $1",
    weapon4: "select * from weaponfour where characterid = $1",
}