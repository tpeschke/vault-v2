import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { SkillPair } from "@vault/common/interfaces/v2/pairInterfaces"
import query from "../../../../../../../db/database"

const updateSuiteSQL = `update v2SocialSkillSuites set stat = $1, rank = $2 where pageID = $3 and suiteID = $4`

const descriptionTables = {
    1: 'v2influenceDescriptions',
    2: 'v2intimidateDescriptions',
    3: 'v2informDescriptions',
    4: 'v2inspireDescriptions'
} as const

async function saveDescriptionTable(pageID: number, table: string, rows: SkillPair[]) {
    await query(`delete from ${table} where pageID = $1 and not (id = any($2))`, [pageID, [0, ...rows.map(row => row.id)]])
    return Promise.all(rows.map(({ id, value, rank }, index) => {
        if (id) {
            return query(`update ${table} set value = $1, rank = $2 where id = $3`, [value, rank, id])
        }
        if (value || rank) {
            return query(`insert into ${table} (pageID, value, rank) values ($1, $2, $3)`, [pageID, value, rank ?? index])
        }
        return Promise.resolve()
    }))
}

export default async function saveSocialSuites(pageID: number, socialSuites: SocialSkillSuites) {
    const suites: [1 | 2 | 3 | 4, SocialSkillSuites[keyof SocialSkillSuites]][] = [
        [1, socialSuites.influence],
        [2, socialSuites.intimidate],
        [3, socialSuites.inform],
        [4, socialSuites.inspire]
    ]

    return Promise.all(suites.map(([suiteID, suite]) => Promise.all([
        query(updateSuiteSQL, [suite.stat, suite.rank, pageID, suiteID]),
        saveDescriptionTable(pageID, descriptionTables[suiteID], suite.descriptions ?? [])
    ])))
}
