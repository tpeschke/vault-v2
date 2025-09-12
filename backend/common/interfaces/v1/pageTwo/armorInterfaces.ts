export interface ArmorInfo {
    def: ArmorStatObject,
    fat: ArmorStatObject,
    rcv: ArmorStatObject
    init: ArmorStatObject
}

export interface ArmorStatObject {
    base?: number,
    skill?: number,
    misc?: number,
    total: number
}
