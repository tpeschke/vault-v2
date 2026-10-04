import query from "../../../../../db/database"

const deleteBasicsSQL = `delete from v2Page2Basics where pageID = $1`
const deleteGeneralSuitesSQL = `delete from v2GeneralSkillSuites where pageID = $1`
const deleteAdvGeneralSQL = `delete from v2AdvancedGeneralSkills where pageID = $1`
const deleteCombatSuitesSQL = `delete from v2CombatSkillSuites where pageID = $1`
const deleteAdvCombatSQL = `delete from v2AdvancedCombatSkills where pageID = $1`

export default async function deletePageType2(pageID: number) {
    return Promise.all([
        query(deleteBasicsSQL, pageID),
        query(deleteGeneralSuitesSQL, pageID),
        query(deleteAdvGeneralSQL, pageID),
        query(deleteCombatSuitesSQL, pageID),
        query(deleteAdvCombatSQL, pageID)
    ])
}
