export interface CombatSkillsInfo {
    combatStatModifiers: CombatStatModifiers,
    martialAdepts: number
}

export interface CombatStatModifiers {
    atk: number,
    def: number,
    dam: number,
    rec: number
}