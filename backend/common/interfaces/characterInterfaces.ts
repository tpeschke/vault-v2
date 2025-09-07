export interface CharacterHomeInfo {
    id: number,
    name: string,
    level: number,
    race: string,
    primarya: string,
    secondarya: string
}

export interface CharacterBase {
    version: 1 | 2
}

export interface CharacterVersion1 extends CharacterBase {
    version: 1,
    id: number,
    generalInfo: GeneralInfo,
    statInfo: StatsInfo,
    movementInfo: MovementInfo,
    characteristicInfo: CharacteristicInfo
}

export interface GeneralInfo {
    name: string,
    ancestry: string,
    class: string,
    subclass: String,
    level: number,
    crpUnspent: number,
    crpSpent: number,
    crpToNextLevel: number 
}

export interface StatsInfo {
    str: number,
    dex: number,
    con: number,
    int: number,
    will: number,
    pre: number,
}

export interface MovementInfo {
    crawl: number,
    walk: number,
    jog: number,
    run: number,
    sprint: number
}

export interface PairObject {
    title: string | null,
    value: string | number
}

export interface CharacteristicInfo {
    goals: string[],
    relationships: PairObject[],
    flaws: string[],
    culturalStrength: string,
    reputation: string[],
    assets: string
}