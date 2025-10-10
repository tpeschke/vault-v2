import { Wound } from "./pageOne/rightColumnInterfaces"
import { GearObject } from "./pageTwo/gearInterfaces"

export type QuickEditBody = {
    characterID: number
} & (QuickEditNumberBody | QuickEditStringBody | QuickEditWoundBody | QuickEditEquipmentBody)

export type QuickEditNumberAttributes = 'crpUnspent' | 'crpSpent' | 'integrity' | 'gritDice' | 'favor' | 'stress' | 'relaxation' | 'copper' | 'silver' | 'gold' | 'platinum'

export interface QuickEditNumberBody {
    attribute: QuickEditNumberAttributes,
    value: number
}

export type QuickEditStringAttributes = 'assets' | 'notes'

export interface QuickEditStringBody {
    attribute: QuickEditStringAttributes,
    value: string
}

export type QuickEditActions = 'add' | 'update' | 'delete'

export interface QuickEditWoundBody {
    attribute: 'wound',
    value: Wound,
    action: QuickEditActions
}

export interface QuickEditEquipmentBody {
    attribute: 'equipment',
    value: GearObject,
    action: QuickEditActions
}