import { Wound } from "./pageOne/rightColumnInterfaces"
import { GearObject } from "./pageTwo/gearInterfaces"

export type QuickEditBody = {
    characterID: number
} & (QuickEditNumberBody | QuickEditStringBody | QuickEditWoundBody | QuickEditEquipmentBody | QuickEditArmorModifierBody | QuickEditShieldModifierBody | QuickEditWeaponModifierBody)

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

export interface ShieldQuickEditModifiers {
    shieldID: number,
    def: number | undefined,
    fat: number | undefined,
    pry: number | undefined,
    brk: number | undefined
}

export interface QuickEditShieldModifierBody {
    attribute: 'shield',
    value: ShieldQuickEditModifiers
}

export interface WeaponQuickEditModifiers {
    weaponID: number,
    position: number,
    atk: number | undefined,
    rec: number | undefined,
    pry: number | undefined,
    dam: number | undefined
}

export interface QuickEditWeaponModifierBody {
    attribute: 'weapon',
    value: WeaponQuickEditModifiers
}

export type QuickEditComplexAttributes = 'wounds'

export type QuickEditActions = 'add' | 'update' | 'delete'

export interface ResolvedAction {
    key: string,
    id: number
}

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