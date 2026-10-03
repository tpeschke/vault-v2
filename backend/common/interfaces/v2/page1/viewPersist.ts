export type ViewPersistAttribute = 'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress' | 'selfDoubtDieIndex' | 'damageDieIndex' | 'stressDieIndex'

export interface ViewPersistBody {
    pageID: number
    attribute: ViewPersistAttribute
    value: number
}
