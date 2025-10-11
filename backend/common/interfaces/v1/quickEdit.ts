import { Wound } from "./pageOne/rightColumnInterfaces"
import { GearObject } from "./pageTwo/gearInterfaces"

export type QuickEditBody = {
    characterID: number
} & (QuickEditNumberBody | QuickEditStringBody | QuickEditWoundBody | QuickEditEquipmentBody | QuickEditArmorModifierBody)

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

export interface ArmorQuickEditModifiers {
    armorID: number,
    def: number | undefined,
    fat: number | undefined,
    rec: number | undefined,
    init: number | undefined
}

export interface QuickEditArmorModifierBody {
    attribute: 'armor',
    value: ArmorQuickEditModifiers
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