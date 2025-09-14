import { Response, Request } from '../../interfaces/apiInterfaces'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import viewSQL from '../../db/queries/v1/view'
import query from '../../db/database'

interface ViewRequest extends Request {
    params: {
        characterId: string
    }
}

export async function getCharacter(request: ViewRequest, response: Response) {
    const characterId = +request.params.characterId

    const {
        userid, name, race, primarya, secondarya, crp, excurrent, str, dex, con, int, wis, cha, stressthreshold, favormax, vitality, sizemod, vitalitydice, level,
        honor, extrahonordice, temperament, abilitiesone, abilitiestwo, removedability, maxrange, generalnotes, copper, silver, gold, platinum, contacts, crawl, walk, jog,
        run, sprint, currentfavor, currentstress, relaxation, skilladept, anointed, martialadept, secretgeneralnotes, stressdie, strength
    }: any = await query(viewSQL.character, characterId)

    // TODO 
    // Characteristics
    // Wounds
    // Gear
    // Skill Suites
    // Native Language
    // Adv Skills
    // Armor Info
    // Shield Info
    // Weapon Info
    // Combat Skill Suites
    // Combat Adv Skills

    let character: CharacterVersion1 = {
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
                    goals: [],
                    relationships: [],
                    flaws: [temperament],
                    culturalStrength: strength,
                    reputation: [],
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
                    wounds: [],
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
                gear: []
            },
            skillInfo: {
                skillSuites: [],
                nativeLanguage: {
                    skill: '',
                    cost: 0,
                    rank: 0,
                    mod: 0
                },
                advancedSkills: [],
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
                armorInfo: {
                    name: '',
                    dr: '',
                    skillAdj: 0,
                    bonus: '',
                    modifiers: {
                        def: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        },
                        fat: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        },
                        rcv: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        },
                        init: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        }
                    }
                },
                shieldInfo: {
                    name: '',
                    dr: '',
                    size: '',
                    cover: '',
                    bonus: '',
                    modifiers: {
                        def: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        },
                        fat: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        },
                        pry: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        },
                        brk: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            // TODO calculate
                            total: 0
                        }
                    }
                },
                weaponInfo: [],
                combatSkillInfo: {
                    // TODO calculate
                    combatStatModifiers: {
                        atk: 0,
                        def: 0,
                        dam: 0,
                        rec: 0
                    },
                    martialAdepts: martialadept,
                    combatSkillSuites: [],
                    combatAdvSkills: []
                }
            }
        },
        generalNotes: {
            notes: generalnotes,
            isSecret: secretgeneralnotes
        }
    }
}