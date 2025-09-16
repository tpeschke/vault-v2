export default {
    character: "select * from cvcharactermain main where main.id = $1",
    wounds: "select id, cast(title as INTEGER) as severity, cast(value as integer) as days from damageone where characterid = $1 union select id, cast(title as INTEGER) as severity, cast(value as integer) as days from damagetwo where characterid = $1;",
    gear: "select id, title as item, value as size from cvgearone where characterid = $1 union select id, title as item, value as size from cvgeartwo where characterid = $1 union select id, title as item, value as size from cvgearthree where characterid = $1 union select id, title as item, value as size from cvgearfour where characterid = $1"
}