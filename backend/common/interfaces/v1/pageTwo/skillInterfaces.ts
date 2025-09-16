export interface SkillInfo {
    skillSuites: SkillObject[],
    nativeLanguage: SkillObject,
    advancedSkills: SkillObject[],
    checkMods: CheckModsObject,
    adepts: number
}

export interface CheckModsObject {
    str: number,
    dex: number,
    con: number,
    int: number,
    will: number,
    pre: number
}

export interface SkillObject {
    id?: number,
    skill: string,
    cost: number,
    isTrained?: boolean,
    rank: number,
    mod: number
}