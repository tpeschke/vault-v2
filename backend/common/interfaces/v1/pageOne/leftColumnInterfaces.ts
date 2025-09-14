export interface LeftColumnInfo {
    statInfo: StatsInfo,
    movementInfo: MovementInfo,
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
    integrityInfo: IntegrityInfo,
    goals: string[],
    relationships: PairObject[],
    flaws: string[],
    culturalStrength: string,
    reputation: string[],
    assets: string
}

export interface IntegrityInfo {
    integrity: number,
    gritDie: number,
}