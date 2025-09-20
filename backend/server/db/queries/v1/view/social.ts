export default {
    convictions: "select id, title, value from cvtraits where characterid = $1 order by NULLIF(regexp_replace(value, '\D', '', 'g'), '')::int desc",
    descriptions: " select id, title, value from cvdescriptions where characterid = $1 order by NULLIF(regexp_replace(value, '\D', '', 'g'), '')::int desc",
    flaws: "select id, COALESCE (title, value) as title from cvflaws where characterid = $1",
    goals: "select id, goal as title from cvgoals where characterid = $1",
    relationships: "select id, title, value from cvdevotions where characterid = $1",
    reputation: "select id, value from cvreputation where characterid = $1",
}