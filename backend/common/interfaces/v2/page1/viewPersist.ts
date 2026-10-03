export type ViewPersistAttribute = 'unspent' | 'currentFavor' | 'diePenalty' | 'damage' | 'stress'

export interface ViewPersistBody {
    pageID: number
    attribute: ViewPersistAttribute
    value: number
}
