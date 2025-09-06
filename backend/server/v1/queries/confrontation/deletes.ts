export default {
    allDescriptions: "delete from cvdescriptions where characterid = $1",
    allDevotions: "delete from cvdevotions where characterid = $1",
    allFlaws: "delete from cvflaws where characterid = $1",
    allGoals: "delete from cvgoals where characterid = $1",
    allReputation: "delete from cvreputation where characterid = $1",
    allTraits: "delete from cvtraits where characterid = $1"
}