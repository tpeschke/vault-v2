import { COMBAT_SUITE_KEYS, GENERAL_SUITE_KEYS } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../db/database"

const addBasicsSQL = `insert into v2Page2Basics (pageID) values ($1)`
const addGeneralSuiteSQL = `insert into v2GeneralSkillSuites (pageID, suiteID) values ($1, $2)`
const addCombatSuiteSQL = `insert into v2CombatSkillSuites (pageID, suiteID) values ($1, $2)`

export default async function addPageType2(pageID: number): Promise<boolean> {
    await Promise.all([
        query(addBasicsSQL, pageID),
        ...GENERAL_SUITE_KEYS.map((_, index) => query(addGeneralSuiteSQL, [pageID, index + 1])),
        ...COMBAT_SUITE_KEYS.map((_, index) => query(addCombatSuiteSQL, [pageID, index + 1]))
    ])
    return true
}
