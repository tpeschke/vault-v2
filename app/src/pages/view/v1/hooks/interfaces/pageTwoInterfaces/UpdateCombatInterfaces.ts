import { ArmorInfoObjectKeys, ArmorModifiersInfoKeys, ArmorModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces"
import { CombatSkillObject, CombatSkillObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills"
import { ShieldInfoObjectKeys, ShieldModifiersInfoKeys, ShieldModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces"

export interface CombatUpdates {
    combatSkillUpdates: CombatSkillUpdates,
    armorUpdates: ArmorUpdates,
    shieldUpdates: ShieldUpdates
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

export interface ArmorUpdates {
    updateBasicArmorInfo: UpdateBasicArmorInfoFunction,
    updateArmorModifier: UpdateArmorModifierFunction
}

export type UpdateBasicArmorInfoFunction = (key: ArmorInfoObjectKeys, value: string | number) => void

export type UpdateArmorModifierFunction = (modifier: ArmorModifiersInfoKeys, key: ArmorModifiersObjectKeys, value: number) => void

export interface ShieldUpdates {
    updateBasicShieldInfo: UpdateBasicShieldInfoFunction,
    updateShieldModifier: UpdateShieldModifierFunction
}

export type UpdateBasicShieldInfoFunction = (key: ShieldInfoObjectKeys, value: string | number) => void

export type UpdateShieldModifierFunction = (modifier: ShieldModifiersInfoKeys, key: ShieldModifiersObjectKeys, value: number) => void
