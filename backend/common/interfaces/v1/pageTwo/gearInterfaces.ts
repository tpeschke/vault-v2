export interface GearInfo {
    copper: number,
    silver: number,
    gold: number,
    carry: number,
    gear: GearObject[]
}

export interface GearObject {
    id: number,
    item?: string,
    size?: string
}