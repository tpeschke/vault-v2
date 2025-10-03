export interface GearInfo {
    copper: number,
    silver: number,
    gold: number,
    platinum: number
    carry: number,
    gear: GearObject[]
}

type GearInfoObjects = Omit<GearInfo, 'gear' | 'carry'>

export type GearInfoObjectsKeys = keyof GearInfoObjects

export interface GearObject {
    id?: number,
    item?: string,
    size?: string
}

export type GearObjectKeys = keyof GearObject