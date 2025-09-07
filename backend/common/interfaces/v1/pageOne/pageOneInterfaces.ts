import { LeftColumnInfo } from "./leftColumnInterfaces"
import { RightColumnInfo } from "./rightColumnInterfaces"

export interface PageOneInfo {
    leftColumnInfo: LeftColumnInfo,
    rightColumnInfo: RightColumnInfo,
    abilitiesNBurdensInfo: AbilitiesNBurdensInfo
}

export interface AbilitiesNBurdensInfo {
    abilityOne: string,
    abilityTwo: string,
    removedAbility: string
    burdens: string,
}