import query from "../../../../../../../db/database"

const deleteSocialSuiteSQL = `delete from v2SocialSkillSuites where pageID = $1`

const deleteInfluenceDescriptionsSQL = `delete from v2influenceDescriptions where pageID = $1`
const deleteIntimidateDescriptionsSQL = `delete from v2intimidateDescriptions where pageID = $1`
const deleteInformDescriptionsSQL = `delete from v2informDescriptions where pageID = $1`
const deleteInspireDescriptionsSQL = `delete from v2inspireDescriptions where pageID = $1`

export default async function deleteSocialSuites(pageID: number) {
    return Promise.all([
        query(deleteSocialSuiteSQL, pageID),
        query(deleteInfluenceDescriptionsSQL, pageID),
        query(deleteIntimidateDescriptionsSQL, pageID),
        query(deleteInformDescriptionsSQL, pageID),
        query(deleteInspireDescriptionsSQL, pageID),
    ])
}
