export interface ArmorInfo {
    id: number,
    name: string,
    dr: string,
    skillAdj: number,
    bonus: string,
    modifiers: ArmorModifiersInfo
}

type ArmorInfoObject = Omit<ArmorInfo, 'modifiers'>

export type ArmorInfoObjectKeys = keyof ArmorInfoObject

export interface ArmorModifiersInfo {
    def: ArmorModifiersObject,
    fat: ArmorModifiersObject,
    rec: ArmorModifiersObject
    init: ArmorModifiersObject
}

export type ArmorModifiersInfoKeys = keyof ArmorModifiersInfo

export interface ArmorModifiersObject {
    base: number,
    skill: number,
    misc: number,
    total: number
}

export type ArmorModifiersObjectKeys = keyof ArmorModifiersObject