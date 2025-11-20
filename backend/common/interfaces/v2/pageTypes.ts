import { Characteristics } from "./page1/characteristicsInfo"
import { CombatInfo } from "./page1/combatInfo"
import { Favor } from "./page1/favor"
import { GeneralInfo } from "./page1/generalInfoInterfaces"
import { Movement } from "./page1/movement"
import { Stats } from "./page1/statsInterface"
import { Vitals } from "./page1/vitals"

export type PageV2 = {
    type: number
} & (Page404Error | Page1)

export interface Page404Error {
    type: 404
}

export interface Page1 {
    type: 1,
    generalInfo: GeneralInfo,
    stats: Stats,
    characteristicsInfo: Characteristics
    movement: Movement,
    vitalsInfo: Vitals,
    favor: Favor,
    combatInfo: CombatInfo
}