export interface RightColumnInfo {
    weapons: WeaponTable[],
    favorInfo: FavorInfo,
    nerveAndVitalityInfo: NerveAndVitalityInfo
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

export interface FavorInfo {
    favor: number,
    maxFavor: number,
    anointed: boolean
}

export interface NerveAndVitalityInfo {
    vitalityNNerveCalcInfo: VitalityNNerveCalcInfo,
    nerve: number,
    fatigue: number
}

export interface VitalityNNerveCalcInfo {
    vitalityDie: string,
    minVitality: string,
    nerveDie: string,
    minNerve: string,
}