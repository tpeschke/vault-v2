export interface ArmorInfo {
    name: string,
    dr: string,
    skillAdj: number,
    bonus: string,
    modifiers: ArmorModifiersInfo
}

export interface ArmorModifiersInfo {
    def: ArmorModifiersObject,
    fat: ArmorModifiersObject,
    rcv: ArmorModifiersObject
    init: ArmorModifiersObject
}

export interface ArmorModifiersObject {
    base?: number,
    skill?: number,
    misc?: number,
    total: number
}
