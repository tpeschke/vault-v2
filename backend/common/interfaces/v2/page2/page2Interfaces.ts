export const GENERAL_SUITE_KEYS = [
    'athletics',
    'lore',
    'strategy',
    'streetwise',
    'survival',
    'trades',
    'weirdcraft'
] as const

export const COMBAT_SUITE_KEYS = [
    'armor',
    'melee',
    'ranged',
    'shields',
    'unarmed'
] as const

export type GeneralSuiteKey = typeof GENERAL_SUITE_KEYS[number]
export type CombatSuiteKey = typeof COMBAT_SUITE_KEYS[number]

export type SkillNumber = number | ''

export interface SuiteStatRank {
    stat: SkillNumber
    rank: SkillNumber
}

export interface SuiteRank {
    rank: SkillNumber
}

export type GeneralSkillSuites = Record<GeneralSuiteKey, SuiteStatRank>
export type CombatSkillSuites = Record<CombatSuiteKey, SuiteRank>

export interface NativeLanguage {
    name: string
    stat: SkillNumber
    rank: SkillNumber
}

export interface AdvancedGeneralSkill {
    id: number
    key?: string
    name: string
    stat: SkillNumber
    rank: SkillNumber
}

export interface AdvancedCombatSkill {
    id: number
    key?: string
    name: string
    rank: SkillNumber
}

export function generalSuiteKeyFromId(suiteID: number): GeneralSuiteKey | undefined {
    return GENERAL_SUITE_KEYS[suiteID - 1]
}

export function combatSuiteKeyFromId(suiteID: number): CombatSuiteKey | undefined {
    return COMBAT_SUITE_KEYS[suiteID - 1]
}

export function generalSuiteId(key: GeneralSuiteKey): number {
    return GENERAL_SUITE_KEYS.indexOf(key) + 1
}

export function combatSuiteId(key: CombatSuiteKey): number {
    return COMBAT_SUITE_KEYS.indexOf(key) + 1
}

export function emptyGeneralSuites(): GeneralSkillSuites {
    return {
        athletics: { stat: '', rank: '' },
        lore: { stat: '', rank: '' },
        strategy: { stat: '', rank: '' },
        streetwise: { stat: '', rank: '' },
        survival: { stat: '', rank: '' },
        trades: { stat: '', rank: '' },
        weirdcraft: { stat: '', rank: '' }
    }
}

export function emptyCombatSuites(): CombatSkillSuites {
    return {
        armor: { rank: '' },
        melee: { rank: '' },
        ranged: { rank: '' },
        shields: { rank: '' },
        unarmed: { rank: '' }
    }
}
