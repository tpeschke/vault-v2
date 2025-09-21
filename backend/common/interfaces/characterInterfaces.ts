import { PageOneInfo } from "./v1/pageOne/pageOneInterfaces"
import { GeneralNotesInfo } from "./v1/pageThree/generalNotesInterfaces"
import { PageTwoInfo } from "./v1/pageTwo/pageTwoInterfaces"

export interface CharacterBase {
    version: 1 | 2
}

export interface CharacterVersion1 extends CharacterBase {
    version: 1,
    id: number,
    userInfo: CharacterUserInfo,
    pageOneInfo: PageOneInfo,
    pageTwoInfo: PageTwoInfo,
    generalNotes: GeneralNotesInfo
}

export interface CharacterUserInfo {
    userID: number,
    ownsThisCharacter: boolean
}

// TODO: Update the terms used
export interface CharacterHomeInfo {
    id: number,
    name: string,
    level: number,
    race: string,
    primarya: string,
    secondarya: string
}