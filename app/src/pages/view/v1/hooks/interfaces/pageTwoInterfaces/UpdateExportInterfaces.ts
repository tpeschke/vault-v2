import { InsertGearFunction, UpdateCashFunction, UpdateGearFunction } from "./UpdateGearInterfaces";

export interface PageTwoUpdates {
    updateCash: UpdateCashFunction,
    updateGear: UpdateGearFunction,
    insertGear: InsertGearFunction
}