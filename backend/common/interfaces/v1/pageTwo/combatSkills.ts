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
    skill: string,
    cost: number,
    isTrained?: boolean,
    rank: number,
}

