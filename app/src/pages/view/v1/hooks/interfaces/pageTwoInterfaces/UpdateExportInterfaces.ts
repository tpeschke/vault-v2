import { CombatUpdates } from "./UpdateCombatInterfaces";
import { InsertGearFunction, UpdateCashFunction, UpdateGearFunction } from "./UpdateGearInterfaces";
import { SkillUpdates } from "./UpdateSkillInterfaces";

export interface PageTwoUpdates {
    updateCash: UpdateCashFunction,
    updateGear: UpdateGearFunction,
    insertGear: InsertGearFunction,
    updateSkillInfo: SkillUpdates,
    updateCombatInfo: CombatUpdates,
}