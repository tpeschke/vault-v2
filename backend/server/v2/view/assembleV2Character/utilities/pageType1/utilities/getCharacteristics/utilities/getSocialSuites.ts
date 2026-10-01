import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"
import { SkillPair } from "@vault/common/interfaces/v2/pairInterfaces"

interface SocialSuiteReturn {
    id: number,
    pageid: number,
    suiteid: number,
    stat: number,
    rank: number
}

const getSocialSuiteSQL = `select * from v2SocialSkillSuites where pageID = $1 order by suiteID`

const getInfluenceDescriptionsSQL = `select * from v2influenceDescriptions where pageID = $1`
const getIntimidateDescriptionsSQL = `select * from v2intimidateDescriptions where pageID = $1`
const getInformDescriptionsSQL = `select * from v2informDescriptions where pageID = $1`
const getInspireDescriptionsSQL = `select * from v2inspireDescriptions where pageID = $1`

export default async function getSocialSuites(pageID: number): Promise<SocialSkillSuites> {
    const [
        [influence, intimidate, inform, inspire],
        influenceDescriptions,
        intimidateDescriptions,
        informDescriptions,
        inspireDescriptions,
    ]: [SocialSuiteReturn[], SkillPair[], SkillPair[], SkillPair[], SkillPair[]] = await Promise.all([
        query(getSocialSuiteSQL, pageID),
        query(getInfluenceDescriptionsSQL, pageID),
        query(getIntimidateDescriptionsSQL, pageID),
        query(getInformDescriptionsSQL, pageID),
        query(getInspireDescriptionsSQL, pageID),
    ])

    return {
        influence: {
            ...influence,
            descriptions: influenceDescriptions
        },
        intimidate: {
            ...intimidate,
            descriptions: intimidateDescriptions
        },
        inform: {
            ...inform,
            descriptions: informDescriptions
        },
        inspire: {
            ...inspire,
            descriptions: inspireDescriptions
        },
    }
}
