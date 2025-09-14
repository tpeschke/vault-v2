import { ArmorInfo } from "./armorInterfaces"
import { CombatSkillsInfo } from "./combatSkills"
import { GearInfo } from "./gearInterfaces"
import { ShieldInfo } from "./shieldInterfaces"
import { SkillInfo } from "./skillInterfaces"
import { WeaponInfo } from "./weaponInterfaces"

export interface PageTwoInfo {
    gearInfo: GearInfo,
    skillInfo: SkillInfo,
    combatWorkspaceInfo: CombatWorkspaceInfo
}

export interface CombatWorkspaceInfo {
    armorInfo: ArmorInfo,
    shieldInfo: ShieldInfo,
    weaponInfo: WeaponInfo[],
    combatSkillInfo: CombatSkillsInfo
}