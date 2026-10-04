import { SkillNumber } from "../page2/page2Interfaces"

export const PAGE3_GEAR_SLOTS = [
    'head', 'chest', 'coat', 'gloves', 'pants', 'shoes', 'armor', 'lHand', 'rHand',
    'backpack',
    'leftS1', 'leftS2', 'leftS3', 'leftS4', 'leftS5', 'leftS6', 'leftS7', 'leftS8', 'leftS9',
    'pouch1', 'leftS10', 'leftS11',
    'pouch2', 'leftS12', 'leftS13',
    'pouch3', 'leftS14', 'leftS15',
    'heldBag1', 'midS1', 'midS2', 'midS3', 'heldBag2', 'midS4', 'midS5', 'midS6',
    'other1', 'other2', 'other3',
    'carryM4', 'carryM3', 'carryM2', 'carryM1', 'carry0', 'carryP1', 'carryP2', 'carryP3', 'carryP4', 'carryP5',
    'qm1', 'qm2', 'qm3', 'qm4', 'qm5', 'qm6', 'qm7', 'qm8', 'qm9', 'qm10',
    'tiny1', 'tiny2', 'tiny3', 'tiny4', 'tiny5', 'tiny6', 'tiny7', 'tiny8', 'tiny9', 'tiny10'
] as const

export type Page3GearSlot = typeof PAGE3_GEAR_SLOTS[number]

export const PAGE3_DEFAULT_S_SLOTS: readonly Page3GearSlot[] = [
    'leftS1', 'leftS2', 'leftS3', 'leftS4', 'leftS5', 'leftS6', 'leftS7', 'leftS8', 'leftS9',
    'leftS10', 'leftS11', 'leftS12', 'leftS13', 'leftS14', 'leftS15',
    'midS1', 'midS2', 'midS3', 'midS4', 'midS5', 'midS6',
    'carryM4', 'carryM3', 'carryM2', 'carryM1', 'carry0', 'carryP1', 'carryP2', 'carryP3', 'carryP4', 'carryP5'
]

const defaultS = new Set<string>(PAGE3_DEFAULT_S_SLOTS)

export function isDefaultSSlot(slot: Page3GearSlot): boolean {
    return defaultS.has(slot)
}

export interface Page3Contact {
    id: number
    key?: string
    value: string
}

export interface Page3Relationship {
    id: number
    key?: string
    value: string
    r: SkillNumber
    p: SkillNumber
}

export interface Page3GearCell {
    slot: Page3GearSlot
    item: string
    size: string
    staffSnake: boolean
    meditating: boolean
    w: SkillNumber
}

export type Page3Gear = Record<Page3GearSlot, Page3GearCell>

export interface Page3Coinage {
    copper: number
    copperSize: string
    silver: number
    silverSize: string
    gold: number
    goldSize: string
    platinum: number
    platinumSize: string
}

export function emptyGearCell(slot: Page3GearSlot): Page3GearCell {
    return {
        slot,
        item: '',
        size: isDefaultSSlot(slot) ? 'S' : '',
        staffSnake: false,
        meditating: false,
        w: ''
    }
}

export function emptyPage3Gear(): Page3Gear {
    return Object.fromEntries(
        PAGE3_GEAR_SLOTS.map(slot => [slot, emptyGearCell(slot)])
    ) as Page3Gear
}

export function emptyPage3Coinage(): Page3Coinage {
    return {
        copper: 0,
        copperSize: '',
        silver: 0,
        silverSize: '',
        gold: 0,
        goldSize: '',
        platinum: 0,
        platinumSize: ''
    }
}
