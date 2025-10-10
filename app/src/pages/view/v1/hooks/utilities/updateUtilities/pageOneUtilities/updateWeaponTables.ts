import { findInitiativeSkillMod } from "@vault/common/dictionaries/v1/findSkills";
import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { WeaponTable } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";
import formatWeaponTable from "@vault/common/utilities/v1/weaponTable";

export function updateWeaponTables(character: CharacterVersion1, atkCombatMod: number, defCombatMod: number, damCombatMod: number, recCombatMod: number): WeaponTable[] {
    const { skillSuites, advancedSkills } = character.pageTwoInfo.skillInfo;
    const initiativeSkillMod = findInitiativeSkillMod(skillSuites[4], advancedSkills);

    const { armorInfo, shieldInfo, weaponInfo } = character.pageTwoInfo.combatWorkspaceInfo;
    const [weaponInfo1, weaponInfo2, weaponInfo3, weaponInfo4] = weaponInfo;

    const weapon1 = formatWeaponTable(
        weaponInfo1,
        armorInfo,
        shieldInfo,
        initiativeSkillMod,
        atkCombatMod,
        defCombatMod,
        damCombatMod,
        recCombatMod
    );

    const weapon2 = formatWeaponTable(
        weaponInfo2,
        armorInfo,
        shieldInfo,
        initiativeSkillMod,
        atkCombatMod,
        defCombatMod,
        damCombatMod,
        recCombatMod
    );

    const weapon3 = formatWeaponTable(
        weaponInfo3,
        armorInfo,
        shieldInfo,
        initiativeSkillMod,
        atkCombatMod,
        defCombatMod,
        damCombatMod,
        recCombatMod
    );


    const weapon4 = formatWeaponTable(
        weaponInfo4,
        armorInfo,
        shieldInfo,
        initiativeSkillMod,
        atkCombatMod,
        defCombatMod,
        damCombatMod,
        recCombatMod
    );

    return [weapon1, weapon2, weapon3, weapon4];
}
