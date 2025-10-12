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

type ShieldInfoObject = Omit<ShieldInfo, 'modifiers'>

export type ShieldInfoObjectKeys = keyof ShieldInfoObject

export interface ShieldModifiersInfo {
    def: ShieldModifiersObject,
    fat: ShieldModifiersObject,
    pry: ShieldModifiersObject
    brk: ShieldModifiersObject
}

export type ShieldModifiersInfoKeys = keyof ShieldModifiersInfo

export interface ShieldModifiersObject {
    base: number,
    skill: number,
    misc: number,
    total: number
}

export type ShieldModifiersObjectKeys = keyof ShieldModifiersObject