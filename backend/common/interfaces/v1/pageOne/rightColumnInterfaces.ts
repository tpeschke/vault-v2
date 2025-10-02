export interface RightColumnInfo {
    weapons: WeaponTable[],
    maxRange: number,
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

export type FavorInfoKeys = keyof FavorInfo

export interface NerveAndVitalityInfo {
    vitalityNNerveCalcInfo: VitalityNNerveCalcInfo,
    nerve: number,
    stress: number,
    relaxation: number,
    fatigue: number,
    vitality: number,
    wounds: Wound[],
    sizeMod: number
}

export type NerveAndVitalityInfoKeys = keyof NerveAndVitalityInfo

type NerveAndVitalityObject = Omit<NerveAndVitalityInfo, 'vitalityNNerveCalcInfo' | 'wounds'>

export type NerveAndVitalityObjectKeys = keyof NerveAndVitalityObject

export interface VitalityNNerveCalcInfo {
    vitalityDie: string,
    minVitality: number,
    nerveDie: string,
    minNerve: number,
}

export type VitalityNNerveCalcInfoKeys = keyof VitalityNNerveCalcInfo

export interface Wound {
    id?: number,
    severity: number,
    days: number
}

export type WoundKeys = keyof Wound