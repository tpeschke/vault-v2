export interface ArmorInfo {
    id: number,
    name: string,
    dr: string,
    skillAdj: number,
    bonus: string,
    modifiers: ArmorModifiersInfo
}

export interface ArmorModifiersInfo {
    def: ArmorModifiersObject,
    fat: ArmorModifiersObject,
    rec: ArmorModifiersObject
    init: ArmorModifiersObject
}

export interface ArmorModifiersObject {
    base?: number,
    skill?: number,
    misc?: number,
    total: number
}
