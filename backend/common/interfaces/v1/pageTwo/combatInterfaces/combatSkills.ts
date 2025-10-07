export interface CombatSkillsInfo {
    combatStatModifiers: CombatStatModifiers,
    martialAdepts: number,
    combatSkillSuites: CombatSkillObject[],
    combatAdvSkills: CombatSkillObject[]
}

export interface CombatStatModifiers {
    atk: number,
    def: number,
    dam: number,
    rec: number
}

export interface CombatSkillObject {
    key?: string,
    id?: number,
    skill: string,
    cost: number,
    isTrained?: boolean,
    rank: number
}

export type CombatSkillObjectKeys = keyof CombatSkillObject