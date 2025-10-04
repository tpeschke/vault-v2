import { CombatSkillObject, CombatSkillObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatSkills"

export interface CombatUpdates {
    combatSkillUpdates: CombatSkillUpdates
}

export interface CombatSkillUpdates {
    updateMartialAdept: UpdateMartialAdeptFunction,
    updateCombatSkillSuite: UpdateCombatSkillSuite,
    insertCombatSkill: InsertCombatSkillFunction,
    updateCombatSkill: UpdateCombatSkillFunction
}

export type UpdateMartialAdeptFunction = (value: number) => void

export type UpdateCombatSkillSuite = (changedIndex: number, alteredCombatSuite: CombatSkillObject) => void

export type InsertCombatSkillFunction = (newCombatSkill: CombatSkillObject) => void

export type UpdateCombatSkillFunction = (changedIndex: number, newCombatSkill: CombatSkillObject) => void