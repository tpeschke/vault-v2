export interface LeftColumnInfo {
    statInfo?: StatsInfo,
    movementInfo?: MovementInfo,
    characteristicInfo: CharacteristicInfo,
}

export interface StatsInfo {
    str: number,
    dex: number,
    con: number,
    int: number,
    will: number,
    pre: number,
}

export type StatKeys = keyof StatsInfo

export interface MovementInfo {
    crawl: number,
    walk: number,
    jog: number,
    run: number,
    sprint: number
}

export type MovementKeys = keyof MovementInfo

export interface PairObject {
    key?: string,
    id?: number,
    title: string | undefined,
    value: string | number
}

export interface CharacteristicInfo {
    integrityInfo?: IntegrityInfo,
    goals: PairObject[],
    descriptions: PairObject[],
    convictions: PairObject[],
    relationships: PairObject[],
    flaws: PairObject[],
    culturalStrength: string,
    reputation: PairObject[],
    assets?: string
}

export type CharacteristicStringKeys = 'culturalStrength' | 'assets'

type CharacteristicPairObjects = Omit<CharacteristicInfo, 'integrityInfo' | CharacteristicStringKeys>

export type CharacteristicPairObjectsKeys = keyof CharacteristicPairObjects

export interface IntegrityInfo {
    integrity: number,
    gritDie: number,
}

export type IntegrityKeys = keyof IntegrityInfo