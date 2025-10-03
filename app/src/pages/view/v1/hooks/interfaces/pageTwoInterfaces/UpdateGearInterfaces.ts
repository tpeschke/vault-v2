import { GearInfoObjectsKeys, GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces";

export type UpdateCashFunction = (key: GearInfoObjectsKeys, value: number) => void

export type UpdateGearFunction = (changedIndex: number, newGear: GearObject) => void

export type InsertGearFunction = (newGear: GearObject) => void