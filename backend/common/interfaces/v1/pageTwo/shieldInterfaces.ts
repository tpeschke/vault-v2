export interface ShieldInfo {
    def: ShieldStatObject,
    fat: ShieldStatObject,
    pry: ShieldStatObject
    brk: ShieldStatObject
}

export interface ShieldStatObject {
    base?: number,
    skill?: number,
    misc?: number,
    total: number
}