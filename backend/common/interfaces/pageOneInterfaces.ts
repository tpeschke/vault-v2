export interface PageOneInfo {
    generalInfo: GeneralInfo,
    statInfo: StatsInfo,
    movementInfo: MovementInfo,
    characteristicInfo: CharacteristicInfo,
    abilitiesNBurdensInfo: AbilitiesNBurdensInfo
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

export interface AbilitiesNBurdensInfo {
    abilityOne: string,
    abilityTwo: string,
    removedAbility: string
    burdens: string,
}