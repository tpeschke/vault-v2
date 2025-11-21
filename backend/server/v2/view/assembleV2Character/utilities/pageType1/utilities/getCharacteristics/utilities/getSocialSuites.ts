import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"
import { SkillPair } from "@vault/common/interfaces/v2/pairInterfaces"

interface SocialSuiteReturn {
    id: number,
    characterid: number,
    suiteid: number,
    stat: number,
    rank: number
}

const getSocialSuiteSQL = `select * from v2SocialSkillSuites where characterID = $1 order by suiteID`

const getEmpathizeDescriptionsSQL = `select * from v2EmpathizeDescriptions where characterID = $1`
const getIntimidateDescriptionsSQL = `select * from v2IntimidateDescriptions where characterID = $1`
const getLectureDescriptionsSQL = `select * from v2LectureDescriptions where characterID = $1`
const getTemptDescriptionsSQL = `select * from v2TemptDescriptions where characterID = $1`

export default async function getSocialSuites(characterID: number): Promise<SocialSkillSuites> {
    const [
        [empathize, intimidate, lecture, tempt],
        empathizeDescriptions,
        intimidateDescriptions,
        lectureDescriptions,
        temptDescriptions,
    ]: [SocialSuiteReturn[], SkillPair[], SkillPair[], SkillPair[], SkillPair[]] = await Promise.all([
        query(getSocialSuiteSQL, characterID),
        query(getEmpathizeDescriptionsSQL, characterID),
        query(getIntimidateDescriptionsSQL, characterID),
        query(getLectureDescriptionsSQL, characterID),
        query(getTemptDescriptionsSQL, characterID),
    ])

    return {
        empathize: {
            ...empathize,
            descriptions: empathizeDescriptions
        },
        intimidate: {
            ...intimidate,
            descriptions: intimidateDescriptions
        },
        lecture: {
            ...lecture,
            descriptions: lectureDescriptions
        },
        tempt: {
            ...tempt,
            descriptions: temptDescriptions
        },
    }
}