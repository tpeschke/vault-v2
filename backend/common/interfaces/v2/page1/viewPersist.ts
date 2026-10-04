import { Emotion } from "./characteristicsInfo"
import { Page3Coinage, Page3Contact, Page3GearSlot } from "../page3/page3Interfaces"
import { SkillNumber } from "../page2/page2Interfaces"

export type ViewPersistAttribute = 'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress' | 'selfDoubtDieIndex' | 'damageDieIndex' | 'stressDieIndex' | 'generalSkillNotes' | 'combatSkillNotes' | 'currentEmotions' | 'page3Contacts' | 'page3RelationshipP' | 'page3Gear' | 'page3Coinage' | 'page3Notes'

export interface Page3RelationshipPValue {
    id: number
    p: SkillNumber
}

export interface Page3GearValue {
    slot: Page3GearSlot
    item?: string
    size?: string
    staffSnake?: boolean
    meditating?: boolean
    w?: SkillNumber
}

export type ViewPersistValue = number | string | Emotion[] | Page3Contact[] | Page3RelationshipPValue | Page3GearValue | Page3Coinage

export interface ViewPersistBody {
    pageID: number
    attribute: ViewPersistAttribute
    value: ViewPersistValue
}
