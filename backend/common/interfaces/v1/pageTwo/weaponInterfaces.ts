export interface WeaponInfo {
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
    rcv: WeaponModifiersObject,
    pry: WeaponModifiersObject,
    dam: WeaponModifiersObject
}

export interface WeaponModifiersObject {
    skill: number,
    misc?: number,
    total: number
}