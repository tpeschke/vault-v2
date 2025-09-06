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
    generalInfo: GeneralInfo
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