export type ViewPersistAttribute = 'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress' | 'selfDoubtDieIndex' | 'damageDieIndex' | 'stressDieIndex' | 'generalSkillNotes' | 'combatSkillNotes'

export type ViewPersistValue = number | string

export interface ViewPersistBody {
    pageID: number
    attribute: ViewPersistAttribute
    value: ViewPersistValue
}
