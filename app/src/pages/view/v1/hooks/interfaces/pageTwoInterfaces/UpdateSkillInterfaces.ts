import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"

export interface SkillUpdates {
    leftColumnUpdates: SkillLeftColumnUpdates,
    insertSkill: InsertSkillFunction,
    updateSkill: UpdateSkillFunction
}

export interface SkillLeftColumnUpdates {
    updateSkillAdept: UpdateSkillAdept,
    updateSkillSuite: UpdateSkillSuiteFunction,
    updateNativeLanguage: UpdateNativeLanguageFunction,
}

export type UpdateSkillAdept = (value: number) => void

export type UpdateSkillSuiteFunction = (changedIndex: number, newSkillSuite: SkillObject) => void

export type UpdateNativeLanguageFunction = (nativeLanguage: SkillObject) => void

export type InsertSkillFunction = (newSkill: SkillObject) => void

export type UpdateSkillFunction = (changedIndex: number, newSkill: SkillObject) => void