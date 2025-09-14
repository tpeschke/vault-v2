import { LeftColumnInfo } from "./leftColumnInterfaces"
import { RightColumnInfo } from "./rightColumnInterfaces"

export interface PageOneInfo {
    generalInfo: GeneralInfo
    leftColumnInfo: LeftColumnInfo,
    rightColumnInfo: RightColumnInfo,
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

export interface AbilitiesNBurdensInfo {
    abilityOne: string,
    abilityTwo: string,
    removedAbility: string
    burdens: string,
}