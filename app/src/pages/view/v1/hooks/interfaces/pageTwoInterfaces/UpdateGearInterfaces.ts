import { GearInfoObjectsKeys, GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces";
import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces";

export type UpdateCashFunction = (key: GearInfoObjectsKeys, value: number) => void

export type UpdateGearFunction = (changedIndex: number, newGear: GearObject) => void

export type InsertGearFunction = (newGear: GearObject) => void

export interface SkillUpdates {
    leftColumnUpdates: SkillLeftColumnUpdates
}

export interface SkillLeftColumnUpdates {
    updateSkillAdept: UpdateSkillAdept,
    updateSkillSuite: UpdateSkillSuiteFunction,
    updateNativeLanguage: UpdateNativeLanguageFunction
}

export type UpdateSkillAdept = (value: number) => void

export type UpdateSkillSuiteFunction = (changedIndex: number, newSkillSuite: SkillObject) => void

export type UpdateNativeLanguageFunction = (nativeLanguage: SkillObject) => void