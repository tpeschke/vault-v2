import { SkillPair } from "../pairInterfaces"

export interface Characteristics {
    capacity: number,
    goals: Goal[],
    culturalStrength: string,
    socialSkillDiscount: number,
    currentEmotions: string,
    reputations: CharacteristicPair[],
    convictions: CharacteristicPair[],
    descriptions: Description[],
    relationships: CharacteristicPair[],
    flaws: Flaw[],
    temperaments: Temperaments,
    socialSuites: SocialSkillSuites
}

export interface Goal {
    id: number,
    goal: string
}

export interface Description {
    id: number,
    value: string
}

export interface Flaw {
    id: number,
    flaw: string
}

export interface CharacteristicPair {
    id: number,
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

export interface SocialSkillSuites {
    empathize: SkillSuiteInfo,
    intimidate: SkillSuiteInfo,
    lecture: SkillSuiteInfo,
    tempt: SkillSuiteInfo,
}

export interface SkillSuiteInfo {
    stat: number,
    rank: number,
    descriptions: SkillPair[]
}