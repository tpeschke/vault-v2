export interface GeneralInfo {
    name: string,
    ancestry: string,
    class: string,
    subclass: string,
    level: number,
    crp: CrPInfo
}

export interface CrPInfo {
    unspent: number,
    spent: number,
    toLvl: number
}