export interface PageTwoInfo {
    gearInfo: GearInfo,
    skillInfo: SkillInfo,
    skillSuites: SkillObject[],
    nativeLanguage: SkillObject,
    advancedSkills: SkillObject[],
    combatWorkspaceInfo: CombatWorkspaceInfo
}

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

export interface SkillInfo {
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
    skill: string,
    cost: number,
    isTrained?: boolean,
    rank: number,
    mod: number
}

export interface CombatWorkspaceInfo {
    armorInfo: ArmorInfo
}

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
    total: number,
}