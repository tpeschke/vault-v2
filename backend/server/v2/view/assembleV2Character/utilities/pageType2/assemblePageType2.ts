import { Page2 } from "@vault/common/interfaces/v2/pageTypes"
import {
    AdvancedCombatSkill,
    AdvancedGeneralSkill,
    CombatSkillSuites,
    GeneralSkillSuites,
    SkillNumber,
    combatSuiteKeyFromId,
    emptyCombatSuites,
    emptyGeneralSuites,
    generalSuiteKeyFromId
} from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../../db/database"

interface BasicsReturn {
    nativelanguagename?: string | null
    nativelanguagestat?: number | null
    nativelanguagerank?: number | null
    armorskilladj?: number | null
    genskilldiscount?: number | null
    combatskilldiscount?: number | null
    generalskillnotes?: string | null
    combatskillnotes?: string | null
    abilities?: string | null
    burdens?: string | null
}

interface GeneralSuiteReturn {
    suiteid: number
    stat?: number | null
    rank?: number | null
}

interface CombatSuiteReturn {
    suiteid: number
    rank?: number | null
}

interface AdvGeneralReturn {
    id: number
    name?: string | null
    stat?: number | null
    rank?: number | null
    index?: number | null
}

interface AdvCombatReturn {
    id: number
    name?: string | null
    rank?: number | null
    index?: number | null
}

const getBasicsSQL = `select * from v2Page2Basics where pageID = $1`
const getGeneralSuitesSQL = `select * from v2GeneralSkillSuites where pageID = $1 order by suiteID`
const getCombatSuitesSQL = `select * from v2CombatSkillSuites where pageID = $1 order by suiteID`
const getAdvGeneralSQL = `select * from v2AdvancedGeneralSkills where pageID = $1 order by index, id`
const getAdvCombatSQL = `select * from v2AdvancedCombatSkills where pageID = $1 order by index, id`

function numberOrEmpty(value: number | null | undefined): SkillNumber {
    return value === null || value === undefined ? '' : value
}

function mapGeneralSuites(rows: GeneralSuiteReturn[]): GeneralSkillSuites {
    const suites = emptyGeneralSuites()
    for (const row of rows) {
        const key = generalSuiteKeyFromId(row.suiteid)
        if (!key) { continue }
        suites[key] = {
            stat: numberOrEmpty(row.stat),
            rank: numberOrEmpty(row.rank)
        }
    }
    return suites
}

function mapCombatSuites(rows: CombatSuiteReturn[]): CombatSkillSuites {
    const suites = emptyCombatSuites()
    for (const row of rows) {
        const key = combatSuiteKeyFromId(row.suiteid)
        if (!key) { continue }
        suites[key] = { rank: numberOrEmpty(row.rank) }
    }
    return suites
}

export default async function assemblePageType2(pageID: number): Promise<Page2> {
    const page: Page2 = {
        type: 2,
        pageID,
        generalSuites: emptyGeneralSuites(),
        nativeLanguage: {
            name: '',
            stat: '',
            rank: ''
        },
        armorSkillAdj: 0,
        genSkillDiscount: 0,
        combatSkillDiscount: 0,
        generalSkillNotes: '',
        combatSkillNotes: '',
        advancedGeneralSkills: [],
        combatSuites: emptyCombatSuites(),
        advancedCombatSkills: [],
        abilities: '',
        burdens: ''
    }

    const [basicsRows, generalRows, combatRows, advGeneralRows, advCombatRows]: [
        BasicsReturn[],
        GeneralSuiteReturn[],
        CombatSuiteReturn[],
        AdvGeneralReturn[],
        AdvCombatReturn[]
    ] = await Promise.all([
        query(getBasicsSQL, pageID),
        query(getGeneralSuitesSQL, pageID),
        query(getCombatSuitesSQL, pageID),
        query(getAdvGeneralSQL, pageID),
        query(getAdvCombatSQL, pageID)
    ])

    const basics = basicsRows[0]
    if (basics) {
        page.nativeLanguage = {
            name: basics.nativelanguagename ?? '',
            stat: numberOrEmpty(basics.nativelanguagestat),
            rank: numberOrEmpty(basics.nativelanguagerank)
        }
        page.armorSkillAdj = basics.armorskilladj ?? 0
        page.genSkillDiscount = basics.genskilldiscount ?? 0
        page.combatSkillDiscount = basics.combatskilldiscount ?? 0
        page.generalSkillNotes = basics.generalskillnotes ?? ''
        page.combatSkillNotes = basics.combatskillnotes ?? ''
        page.abilities = basics.abilities ?? ''
        page.burdens = basics.burdens ?? ''
    }

    page.generalSuites = mapGeneralSuites(generalRows ?? [])
    page.combatSuites = mapCombatSuites(combatRows ?? [])
    page.advancedGeneralSkills = (advGeneralRows ?? []).map((row): AdvancedGeneralSkill => ({
        id: row.id,
        name: row.name ?? '',
        stat: numberOrEmpty(row.stat),
        rank: numberOrEmpty(row.rank)
    }))
    page.advancedCombatSkills = (advCombatRows ?? []).map((row): AdvancedCombatSkill => ({
        id: row.id,
        name: row.name ?? '',
        rank: numberOrEmpty(row.rank)
    }))

    return page
}
