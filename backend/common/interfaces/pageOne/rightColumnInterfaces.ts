export interface RightColumnInfo {
    weapons: WeaponTable[]
}

export interface WeaponTable {
    name: string,
    attacks: {
        meas: number,
        atk: number,
        damage: string,
        type: string,
        rec: number,
        init: number
    },
    defenses: {
        def: number,
        flanks: number,
        parry: number,
        cover: string,
        parryDR: string,
        dr: string
    }
}