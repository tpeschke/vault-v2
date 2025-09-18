import { Response, Request } from '../../interfaces/apiInterfaces'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
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

    const [rawShieldInfo] = await query(combatSQL.shield, characterId)

    const [weapon1] = await query(combatSQL.weapon1, characterId)
    const [weapon2] = await query(combatSQL.weapon2, characterId)
    const [weapon3] = await query(combatSQL.weapon3, characterId)
    const [weapon4] = await query(combatSQL.weapon4, characterId)

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
                // TODO calculate
                crpToNextLevel: 0
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
                        // TODO calculate
                        minVitality: 0,
                        nerveDie: stressdie,
                        // TODO calculate
                        minNerve: 0
                    },
                    nerve: stressthreshold,
                    stress: currentstress,
                    relaxation: relaxation,
                    // TODO calculate
                    fatigue: 0,
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
                // TODO calculate
                carry: 0,
                gear: await query(viewSQL.gear, characterId)
            },
            skillInfo: {
                skillSuites: (await query(skillSQL.skillSuites, characterId)).map(skillSuite => {
                    // TODO mod calculate
                    return { ...skillSuite, isTrained: skillSuite.istrained }
                }),
                nativeLanguage: {
                    ...nativeLanguage,
                    // TODO calculate
                    mod: 0
                },
                advancedSkills: await query(skillSQL.skills, characterId),
                // TODO calculate
                checkMods: {
                    str: 0,
                    dex: 0,
                    con: 0,
                    int: 0,
                    will: 0,
                    pre: 0
                },
                adepts: skilladept
            },
            combatWorkspaceInfo: {
                armorInfo: formatArmor(rawArmorInfo),
                shieldInfo: formatShield(rawShieldInfo),
                weaponInfo: [
                    formatWeapon(weapon1),
                    formatWeapon(weapon2),
                    formatWeapon(weapon3),
                    formatWeapon(weapon4),
                ],
                combatSkillInfo: {
                    // TODO calculate
                    combatStatModifiers: {
                        atk: 0,
                        def: 0,
                        dam: 0,
                        rec: 0
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