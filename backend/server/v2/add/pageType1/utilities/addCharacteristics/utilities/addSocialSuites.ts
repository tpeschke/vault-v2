import query from "../../../../../../db/database"

const addSocialSuitesSQL = `insert into v2SocialSkillSuites (pageID, suiteID) values ($1, $2)`

export default async function addSocialSuites(pageID: number) {
    return Promise.all([
        query(addSocialSuitesSQL, [pageID, 1]),
        query(addSocialSuitesSQL, [pageID, 2]),
        query(addSocialSuitesSQL, [pageID, 3]),
        query(addSocialSuitesSQL, [pageID, 4])
    ])
}