export interface WeaponInfo {
    id: number,
    name: string,
    damage: string,
    recovery: number,
    size: string,
    measure: number,
    parry: number,
    type: string,
    bonus: string,
    traits: string,
    isThrown?: boolean,
    modifiers: WeaponModifiersInfo
}

type WeaponInfoObject = Omit<WeaponInfo, 'modifiers'>

export type WeaponInfoObjectKeys = keyof WeaponInfoObject

export interface WeaponModifiersInfo {
    atk: WeaponModifiersObject,
    rec: WeaponModifiersObject,
    pry: WeaponModifiersObject,
    dam: WeaponModifiersObject
}

export type WeaponModifiersInfoKeys = keyof WeaponModifiersInfo

export interface WeaponModifiersObject {
    skill: number,
    misc?: number,
    total: number
}

export type WeaponModifiersObjectKeys = keyof WeaponModifiersObject
