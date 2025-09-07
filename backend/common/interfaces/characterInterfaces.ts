import { PageOneInfo } from "./pageOne/pageOneInterfaces"

export interface CharacterHomeInfo {
    id: number,
    name: string,
    level: number,
    race: string,
    primarya: string,
    secondarya: string
}

export interface CharacterBase {
    version: 1 | 2
}

export interface CharacterVersion1 extends CharacterBase {
    version: 1,
    id: number,
    userID: number,
    pageOneInfo: PageOneInfo
}
