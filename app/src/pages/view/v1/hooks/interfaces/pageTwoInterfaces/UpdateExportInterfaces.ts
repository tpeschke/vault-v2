import { InsertGearFunction, SkillUpdates, UpdateCashFunction, UpdateGearFunction } from "./UpdateGearInterfaces";

export interface PageTwoUpdates {
    updateCash: UpdateCashFunction,
    updateGear: UpdateGearFunction,
    insertGear: InsertGearFunction,
    updateSkillInfo: SkillUpdates
}