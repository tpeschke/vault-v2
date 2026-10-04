import { Emotion } from "./characteristicsInfo"

export type ViewPersistAttribute = 'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress' | 'selfDoubtDieIndex' | 'damageDieIndex' | 'stressDieIndex' | 'generalSkillNotes' | 'combatSkillNotes' | 'currentEmotions'

export type ViewPersistValue = number | string | Emotion[]

export interface ViewPersistBody {
    pageID: number
    attribute: ViewPersistAttribute
    value: ViewPersistValue
}
