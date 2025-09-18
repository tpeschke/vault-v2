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
    modifiers: WeaponModifiersInfo
}

export interface WeaponModifiersInfo {
    atk: WeaponModifiersObject,
    rec: WeaponModifiersObject,
    pry: WeaponModifiersObject,
    dam: WeaponModifiersObject
}

export interface WeaponModifiersObject {
    skill: number,
    misc?: number,
    total: number
}