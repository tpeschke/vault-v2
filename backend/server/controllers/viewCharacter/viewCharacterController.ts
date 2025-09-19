import { Response, Request } from '../../interfaces/apiInterfaces'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import getCrPToNextLevel from '@vault/common/dictionaries/v1/crpToNextLevel'
import getMinVitality from '@vault/common/dictionaries/v1/minVitality'
import getMinNerve from '@vault/common/dictionaries/v1/minNerve'
import getCarry from '@vault/common/dictionaries/v1/carry'
import getSkillMod from '@vault/common/dictionaries/v1/skillMod'
import getAttackMod from '@vault/common/dictionaries/v1/combatMods/AttackMod'
import getDefenseMod from '@vault/common/dictionaries/v1/combatMods/DefenseMod'
import getDamageMod from '@vault/common/dictionaries/v1/combatMods/DamageMod'
import getRecoveryMod from '@vault/common/dictionaries/v1/combatMods/RecoveryMod'
import getSkillSuiteMod from '@vault/common/dictionaries/v1/skillSuiteMod'
import viewSQL from '../../db/queries/v1/view/basic'
import socialSQL from '../../db/queries/v1/view/social'
import skillSQL from '../../db/queries/v1/view/skills'
import combatSQL from '../../db/queries/v1/view/combat'
import query from '../../db/database'
import { formatArmor } from './utilities/armorUtilities'
import { formatShield } from './utilities/shieldUtilities'
import { checkForContentTypeBeforeSending } from '../common/sendingFunctions'
import { formatWeapon } from './utilities/weaponUtilities'

interface ViewRequest extends Request {
    params: {
        characterId: string
    }
}

export async function getCharacter(request: ViewRequest, response: Response) {
    const characterId = +request.params.characterId

    const [{
        userid, name, race, primarya, secondarya, crp, excurrent, str, dex, con, int, wis, cha, stressthreshold, favormax, vitality, sizemod, vitalitydice, level,
        honor, extrahonordice, abilitiesone, abilitiestwo, removedability, maxrange, generalnotes, copper, silver, gold, platinum, contacts, crawl, walk, jog,
        run, sprint, currentfavor, currentstress, relaxation, skilladept, anointed, martialadept, secretgeneralnotes, stressdie, strength
    }]: any[] = await query(viewSQL.character, characterId)

    const [nativeLanguage] = await query(skillSQL.nativeLanguage, characterId)

    const [rawArmorInfo] = await query(combatSQL.armor, characterId)
    const armorInfo = formatArmor(rawArmorInfo)

    const [rawShieldInfo] = await query(combatSQL.shield, characterId)
    const shieldInfo = formatShield(rawShieldInfo)

    const [rawWeapon1] = await query(combatSQL.weapon1, characterId)
    const [rawWeapon2] = await query(combatSQL.weapon2, characterId)
    const [rawWeapon3] = await query(combatSQL.weapon3, characterId)
    const [rawWeapon4] = await query(combatSQL.weapon4, characterId)

    const weapon1 = formatWeapon(rawWeapon1)
    const weapon2 = formatWeapon(rawWeapon2)
    const weapon3 = formatWeapon(rawWeapon3)
    const weapon4 = formatWeapon(rawWeapon4)

    const strSkillMod = getSkillMod(str)
    const dexSkillMod = getSkillMod(dex)
    const conSkillMod = getSkillMod(con)
    const intSkillMod = getSkillMod(int)
    const willSkillMod = getSkillMod(wis)
    const preSkillMod = getSkillMod(cha)

    const atkCombatMod = getAttackMod(dex, int)
    const defCombatMod = getDefenseMod(dex, wis)
    const damCombatMod = getDamageMod(str)
    const recCombatMod = getRecoveryMod(str)

    // TODO 
    //      Calculate Weapons

    const character: CharacterVersion1 = {
        version: 1,
        id: characterId,
        userID: userid,
        pageOneInfo: {
            generalInfo: {
                name, level,
                ancestry: race,
                class: primarya,
                subclass: secondarya,
                crpUnspent: crp,
                crpSpent: excurrent,
                crpToNextLevel: getCrPToNextLevel(level)
            },
            leftColumnInfo: {
                statInfo: {
                    str, dex, con, int,
                    will: wis,
                    pre: cha
                },
                movementInfo: {
                    crawl, walk, jog, run, sprint
                },
                characteristicInfo: {
                    integrityInfo: {
                        integrity: honor,
                        gritDie: extrahonordice
                    },
                    goals: await query(socialSQL.goals, characterId),
                    descriptions: await query(socialSQL.descriptions, characterId),
                    convictions: await query(socialSQL.convictions, characterId),
                    relationships: await query(socialSQL.relationships, characterId),
                    flaws: await query(socialSQL.flaws, characterId),
                    culturalStrength: strength,
                    reputation: await query(socialSQL.reputation, characterId),
                    assets: contacts
                }
            },
            rightColumnInfo: {
                // TODO calculate
                weapons: [],
                maxRange: maxrange,
                favorInfo: {
                    favor: currentfavor,
                    maxFavor: favormax,
                    anointed: anointed
                },
                nerveAndVitalityInfo: {
                    vitality,
                    vitalityNNerveCalcInfo: {
                        vitalityDie: vitalitydice,
                        minVitality: getMinVitality(con),
                        nerveDie: stressdie,
                        minNerve: getMinNerve(wis)
                    },
                    nerve: stressthreshold,
                    stress: currentstress,
                    relaxation: relaxation,
                    fatigue: 1 + armorInfo.modifiers.fat.total,
                    wounds: await query(viewSQL.wounds, characterId),
                    sizeMod: sizemod
                }
            },
            abilitiesNBurdensInfo: {
                abilityOne: abilitiesone,
                abilityTwo: abilitiestwo,
                removedAbility: removedability,
                burdens: ''
            }
        },
        pageTwoInfo: {
            gearInfo: {
                copper, silver, gold, platinum,
                carry: getCarry(str),
                gear: await query(viewSQL.gear, characterId)
            },
            skillInfo: {
                skillSuites: (await query(skillSQL.skillSuites, characterId)).map(skillSuite => {
                    const { istrained } = skillSuite
                    return {
                        ...skillSuite,
                        isTrained: istrained,
                        mod: getSkillSuiteMod(skillSuite.skill, strSkillMod, dexSkillMod, conSkillMod, intSkillMod, willSkillMod, preSkillMod)
                    }
                }),
                nativeLanguage: {
                    ...nativeLanguage,
                    mod: intSkillMod
                },
                advancedSkills: await query(skillSQL.skills, characterId),
                checkMods: {
                    str: strSkillMod,
                    dex: dexSkillMod,
                    con: conSkillMod,
                    int: intSkillMod,
                    will: willSkillMod,
                    pre: preSkillMod
                },
                adepts: skilladept
            },
            combatWorkspaceInfo: {
                armorInfo,
                shieldInfo,
                weaponInfo: [
                    formatWeapon(weapon1),
                    formatWeapon(weapon2),
                    formatWeapon(weapon3),
                    formatWeapon(weapon4)
                ],
                combatSkillInfo: {
                    combatStatModifiers: {
                        atk: atkCombatMod,
                        def: defCombatMod,
                        dam: damCombatMod,
                        rec: recCombatMod
                    },
                    martialAdepts: martialadept,
                    combatSkillSuites: (await query(combatSQL.skillSuites, characterId)).map(skillSuite => {
                        return { ...skillSuite, isTrained: skillSuite.istrained }
                    }),
                    combatAdvSkills: await query(combatSQL.skills, characterId)
                }
            }
        },
        generalNotes: {
            notes: generalnotes,
            isSecret: secretgeneralnotes
        }
    }

    checkForContentTypeBeforeSending(response, character)
}