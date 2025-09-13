export interface ShieldInfo {
    name: string,
    dr: string,
    size: string,
    cover: string,
    bonus: string,
    modifiers: ShieldModifiersInfo
}

export interface ShieldModifiersInfo {
    def: ShieldModifiersObject,
    fat: ShieldModifiersObject,
    pry: ShieldModifiersObject
    brk: ShieldModifiersObject
}

export interface ShieldModifiersObject {
    base?: number,
    skill?: number,
    misc?: number,
    total: number
}