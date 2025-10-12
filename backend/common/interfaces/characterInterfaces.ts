import { PageOneInfo } from "./v1/pageOne/pageOneInterfaces"
import { GeneralNotesInfo } from "./v1/pageThree/generalNotesInterfaces"
import { PageTwoInfo } from "./v1/pageTwo/pageTwoInterfaces"

export interface CharacterBase {
    version: 1 | 1.5 | 2
}

export interface CharacterVersion1 extends CharacterBase {
    version: 1,
    isBlank?: boolean,
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

export interface CharacterHomeInfo {
    id: number,
    name: string,
    level: number,
    ancestry: string,
    class: string,
    subclass: string
}