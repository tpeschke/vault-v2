import query from "../../../../../../db/database"

const addSocialSuitesSQL = `insert into v2SocialSkillSuites (characterID, suiteID) values ($1, $2)`

export default async function addSocialSuites(characterID: number) {
    return Promise.all([
        query(addSocialSuitesSQL, [characterID, 1]),
        query(addSocialSuitesSQL, [characterID, 2]),
        query(addSocialSuitesSQL, [characterID, 3]),
        query(addSocialSuitesSQL, [characterID, 4])
    ])
}