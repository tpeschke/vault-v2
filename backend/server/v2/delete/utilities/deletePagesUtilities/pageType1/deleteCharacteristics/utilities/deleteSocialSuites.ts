import query from "../../../../../../../db/database"

const deleteSocialSuiteSQL = `delete from v2SocialSkillSuites where pageID = $1 order by suiteID`

const deleteEmpathizeDescriptionsSQL = `delete from v2EmpathizeDescriptions where pageID = $1`
const deleteIntimidateDescriptionsSQL = `delete from v2IntimidateDescriptions where pageID = $1`
const deleteLectureDescriptionsSQL = `delete from v2LectureDescriptions where pageID = $1`
const deleteTemptDescriptionsSQL = `delete from v2TemptDescriptions where pageID = $1`

export default async function deleteSocialSuites(pageID: number) {
    return Promise.all([
        query(deleteSocialSuiteSQL, pageID),
        query(deleteEmpathizeDescriptionsSQL, pageID),
        query(deleteIntimidateDescriptionsSQL, pageID),
        query(deleteLectureDescriptionsSQL, pageID),
        query(deleteTemptDescriptionsSQL, pageID),
    ])
}