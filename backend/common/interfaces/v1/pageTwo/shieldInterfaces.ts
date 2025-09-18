export interface ShieldInfo {
    id: number,
    name: string,
    dr: string,
    size: string,
    cover: string,
    flanks: number,
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