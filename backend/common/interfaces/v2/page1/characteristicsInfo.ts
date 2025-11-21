import { SkillPair } from "../pairInterfaces"

export interface Characteristics {
    capacity: number,
    goals: Goal[],
    culturalStrength: string,
    socialSkillDiscount: number,
    reputations: CharacteristicPair[],
    convictions: CharacteristicPair[],
    relationships: CharacteristicPair[],
    flaws: string[],
    temperaments: Temperaments,
    socialSuites: {
        empathize: SkillSuiteInfo,
        intimidate: SkillSuiteInfo,
        lecture: SkillSuiteInfo,
        tempt: SkillSuiteInfo,   
    }
}

export interface Goal {
    id: number,
    goal: string
}

export interface CharacteristicPair {
    value: string,
    rank: string
}

export interface Temperaments {
    affability: string,
    openness: string,
    outgoingness: string,
    workEthic: string,
    worry: string,
}

export interface SkillSuiteInfo {
    stat: number,
    rank: number,
    descriptions: SkillPair[]
}