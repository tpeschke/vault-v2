import getAttackMod from "@vault/common/dictionaries/v1/combatMods/AttackMod";
import getDamageMod from "@vault/common/dictionaries/v1/combatMods/DamageMod";
import getDefenseMod from "@vault/common/dictionaries/v1/combatMods/DefenseMod";
import getRecoveryMod from "@vault/common/dictionaries/v1/combatMods/RecoveryMod";
import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { StatKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { findCarryFromQuarterMastering } from "@vault/common/dictionaries/v1/findSkills"
import getSkillMod from '@vault/common/dictionaries/v1/skillMod'
import getCarry from '@vault/common/dictionaries/v1/carry'
import getMinVitality from '@vault/common/dictionaries/v1/minVitality'
import getMinNerve from '@vault/common/dictionaries/v1/minNerve'
import { updateWeaponTables } from "./updateWeaponTables";

export function updateStatUtility(character: CharacterVersion1, key: StatKeys, value: number) {
    const newCharacter = {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            leftColumnInfo: {
                ...character.pageOneInfo.leftColumnInfo,
                statInfo: {
                    ...character.pageOneInfo.leftColumnInfo.statInfo,
                    [key]: value
                }
            }
        }
    };

    const { str, dex, con, int, will, pre } = newCharacter.pageOneInfo.leftColumnInfo.statInfo;

    const strSkillMod = getSkillMod(str)
    const dexSkillMod = getSkillMod(dex)
    const conSkillMod = getSkillMod(con)
    const intSkillMod = getSkillMod(int)
    const willSkillMod = getSkillMod(will)
    const preSkillMod = getSkillMod(pre)

    const atkCombatMod = getAttackMod(dex, int);
    const defCombatMod = getDefenseMod(dex, will);
    const damCombatMod = getDamageMod(str);
    const recCombatMod = getRecoveryMod(str);

    const { skillSuites, advancedSkills } = character.pageTwoInfo.skillInfo
    const quarterMasteringMod = findCarryFromQuarterMastering(skillSuites[4], advancedSkills)

    return {
        ...newCharacter,
        pageOneInfo: {
            ...newCharacter.pageOneInfo,
            rightColumnInfo: {
                ...newCharacter.pageOneInfo.rightColumnInfo,
                weapons: updateWeaponTables(newCharacter, atkCombatMod, defCombatMod, damCombatMod, recCombatMod),
                nerveAndVitalityInfo: {
                    ...newCharacter.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo,
                    vitalityNNerveCalcInfo: {
                        ...newCharacter.pageOneInfo.rightColumnInfo.nerveAndVitalityInfo.vitalityNNerveCalcInfo,
                        minVitality: getMinVitality(con),
                        minNerve: getMinNerve(will)
                    }
                }
            }
        },
        pageTwoInfo: {
            ...newCharacter.pageTwoInfo,
            gearInfo: {
                ...newCharacter.pageTwoInfo.gearInfo,
                carry: getCarry(str) + quarterMasteringMod
            },
            skillInfo: {
                ...newCharacter.pageTwoInfo.skillInfo,
                checkMods: {
                    str: strSkillMod,
                    dex: dexSkillMod,
                    con: conSkillMod,
                    int: intSkillMod,
                    will: willSkillMod,
                    pre: preSkillMod
                }
            },
            combatWorkspaceInfo: {
                ...newCharacter.pageTwoInfo.combatWorkspaceInfo,
                combatSkillInfo: {
                    ...newCharacter.pageTwoInfo.combatWorkspaceInfo.combatSkillInfo,
                    combatStatModifiers: {
                        atk: atkCombatMod,
                        def: defCombatMod,
                        dam: damCombatMod,
                        rec: recCombatMod
                    }
                }
            }
        }
    };
}

