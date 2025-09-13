import { ArmorInfo } from "./armorInterfaces"
import { CombatSkillsInfo } from "./combatSkills"
import { GearInfo } from "./gearInterfaces"
import { ShieldInfo } from "./shieldInterfaces"
import { SkillInfo, SkillObject } from "./skillInterfaces"
import { WeaponInfo } from "./weaponInterfaces"

export interface PageTwoInfo {
    gearInfo: GearInfo,
    skillInfo: SkillInfo,
    skillSuites: SkillObject[],
    nativeLanguage: SkillObject,
    advancedSkills: SkillObject[],
    combatWorkspaceInfo: CombatWorkspaceInfo
}

export interface CombatWorkspaceInfo {
    armorInfo: ArmorInfo,
    shieldInfo: ShieldInfo,
    weaponInfo: WeaponInfo,
    combatSkillInfo: CombatSkillsInfo
}