import { Page2 } from "@vault/common/interfaces/v2/pageTypes"
import {
    COMBAT_SUITE_KEYS,
    GENERAL_SUITE_KEYS,
    SkillNumber
} from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../db/database"

const upsertBasicsSQL = `insert into v2Page2Basics (
    pageID, nativeLanguageName, nativeLanguageStat, nativeLanguageRank,
    armorSkillAdj, genSkillDiscount, combatSkillDiscount,
    generalSkillNotes, combatSkillNotes, abilities, burdens
) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
on conflict (pageID) do update set
    nativeLanguageName = excluded.nativeLanguageName,
    nativeLanguageStat = excluded.nativeLanguageStat,
    nativeLanguageRank = excluded.nativeLanguageRank,
    armorSkillAdj = excluded.armorSkillAdj,
    genSkillDiscount = excluded.genSkillDiscount,
    combatSkillDiscount = excluded.combatSkillDiscount,
    generalSkillNotes = excluded.generalSkillNotes,
    combatSkillNotes = excluded.combatSkillNotes,
    abilities = excluded.abilities,
    burdens = excluded.burdens`

const existingGeneralSuiteSQL = `select id from v2GeneralSkillSuites where pageID = $1 and suiteID = $2`
const updateGeneralSuiteSQL = `update v2GeneralSkillSuites set stat = $1, rank = $2 where pageID = $3 and suiteID = $4`
const insertGeneralSuiteSQL = `insert into v2GeneralSkillSuites (pageID, suiteID, stat, rank) values ($1, $2, $3, $4)`
const existingCombatSuiteSQL = `select id from v2CombatSkillSuites where pageID = $1 and suiteID = $2`
const updateCombatSuiteSQL = `update v2CombatSkillSuites set rank = $1 where pageID = $2 and suiteID = $3`
const insertCombatSuiteSQL = `insert into v2CombatSkillSuites (pageID, suiteID, rank) values ($1, $2, $3)`

const deleteAdvGeneralSQL = `delete from v2AdvancedGeneralSkills where pageID = $1 and not (id = any($2))`
const updateAdvGeneralSQL = `update v2AdvancedGeneralSkills set name = $1, stat = $2, rank = $3, index = $4 where id = $5`
const insertAdvGeneralSQL = `insert into v2AdvancedGeneralSkills (pageID, name, stat, rank, index) values ($1, $2, $3, $4, $5)`

const deleteAdvCombatSQL = `delete from v2AdvancedCombatSkills where pageID = $1 and not (id = any($2))`
const updateAdvCombatSQL = `update v2AdvancedCombatSkills set name = $1, rank = $2, index = $3 where id = $4`
const insertAdvCombatSQL = `insert into v2AdvancedCombatSkills (pageID, name, rank, index) values ($1, $2, $3, $4)`

function numberParam(value: SkillNumber) {
    return value === '' ? null : value
}

function hasAdvGeneralContent(name: string, stat: SkillNumber, rank: SkillNumber) {
    return name !== '' || stat !== '' || rank !== ''
}

function hasAdvCombatContent(name: string, rank: SkillNumber) {
    return name !== '' || rank !== ''
}

export default async function savePageType2(page: Page2): Promise<void> {
    const {
        pageID,
        generalSuites,
        nativeLanguage,
        armorSkillAdj,
        genSkillDiscount,
        combatSkillDiscount,
        generalSkillNotes,
        combatSkillNotes,
        advancedGeneralSkills,
        combatSuites,
        advancedCombatSkills,
        abilities,
        burdens
    } = page

    await query(upsertBasicsSQL, [
        pageID,
        nativeLanguage.name,
        numberParam(nativeLanguage.stat),
        numberParam(nativeLanguage.rank),
        armorSkillAdj,
        genSkillDiscount,
        combatSkillDiscount,
        generalSkillNotes,
        combatSkillNotes,
        abilities,
        burdens
    ])

    await Promise.all(GENERAL_SUITE_KEYS.map(async (key, index) => {
        const suiteID = index + 1
        const { stat, rank } = generalSuites[key]
        const existing = await query(existingGeneralSuiteSQL, [pageID, suiteID])
        if (existing.length) {
            return query(updateGeneralSuiteSQL, [numberParam(stat), numberParam(rank), pageID, suiteID])
        }
        return query(insertGeneralSuiteSQL, [pageID, suiteID, numberParam(stat), numberParam(rank)])
    }))

    await Promise.all(COMBAT_SUITE_KEYS.map(async (key, index) => {
        const suiteID = index + 1
        const { rank } = combatSuites[key]
        const existing = await query(existingCombatSuiteSQL, [pageID, suiteID])
        if (existing.length) {
            return query(updateCombatSuiteSQL, [numberParam(rank), pageID, suiteID])
        }
        return query(insertCombatSuiteSQL, [pageID, suiteID, numberParam(rank)])
    }))

    await query(deleteAdvGeneralSQL, [pageID, [0, ...advancedGeneralSkills.map(row => row.id)]])
    await Promise.all(advancedGeneralSkills.map(({ id, name, stat, rank }, index) => {
        if (id) {
            return query(updateAdvGeneralSQL, [name, numberParam(stat), numberParam(rank), index, id])
        }
        if (hasAdvGeneralContent(name, stat, rank)) {
            return query(insertAdvGeneralSQL, [pageID, name, numberParam(stat), numberParam(rank), index])
        }
        return Promise.resolve()
    }))

    await query(deleteAdvCombatSQL, [pageID, [0, ...advancedCombatSkills.map(row => row.id)]])
    await Promise.all(advancedCombatSkills.map(({ id, name, rank }, index) => {
        if (id) {
            return query(updateAdvCombatSQL, [name, numberParam(rank), index, id])
        }
        if (hasAdvCombatContent(name, rank)) {
            return query(insertAdvCombatSQL, [pageID, name, numberParam(rank), index])
        }
        return Promise.resolve()
    }))
}
