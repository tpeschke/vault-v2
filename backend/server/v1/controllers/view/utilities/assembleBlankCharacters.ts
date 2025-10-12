import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"
import { checkForContentTypeBeforeSending } from "../../../../controllers/common/sendingFunctions"
import { Response } from '../../../../interfaces/apiInterfaces'

export async function assembleBlankCharacter(response: Response) {
    const character: CharacterVersion1 = {
        version: 1,
        isBlank: true,
        id: 0,
        userInfo: {
            userID: 1,
            ownsThisCharacter: false
        },
        pageOneInfo: {
            generalInfo: {
                name: '',
                ancestry: '',
                class: '',
                subclass: '',
                level: 0,
                crpUnspent: 0,
                crpSpent: 0,
                crpToNextLevel: 0
            },
            leftColumnInfo: {
                statInfo: {
                    str: 0,
                    dex: 0,
                    con: 0,
                    int: 0,
                    will: 0,
                    pre: 0,
                },
                movementInfo: {
                    crawl: 0,
                    walk: 0,
                    jog: 0,
                    run: 0,
                    sprint: 0,
                },
                characteristicInfo: {
                    integrityInfo: {
                        integrity: 0,
                        gritDie: 0
                    },
                    goals: [],
                    descriptions: [],
                    convictions: [],
                    relationships: [],
                    flaws: [],
                    culturalStrength: '',
                    reputation: [],
                    assets: ''
                }
            },
            rightColumnInfo: {
                weapons: [{
                    name: '',
                    attacks: {
                        meas: 0,
                        atk: 0,
                        damage: '',
                        type: '',
                        rec: 0,
                        init: 0
                    },
                    defenses: {
                        def: 0,
                        flanks: 0,
                        parry: 0,
                        cover: '',
                        parryDR: '',
                        dr: ''
                    }
                }, {
                    name: '',
                    attacks: {
                        meas: 0,
                        atk: 0,
                        damage: '',
                        type: '',
                        rec: 0,
                        init: 0
                    },
                    defenses: {
                        def: 0,
                        flanks: 0,
                        parry: 0,
                        cover: '',
                        parryDR: '',
                        dr: ''
                    }
                }, {
                    name: '',
                    attacks: {
                        meas: 0,
                        atk: 0,
                        damage: '',
                        type: '',
                        rec: 0,
                        init: 0
                    },
                    defenses: {
                        def: 0,
                        flanks: 0,
                        parry: 0,
                        cover: '',
                        parryDR: '',
                        dr: ''
                    }
                }, {
                    name: '',
                    attacks: {
                        meas: 0,
                        atk: 0,
                        damage: '',
                        type: '',
                        rec: 0,
                        init: 0
                    },
                    defenses: {
                        def: 0,
                        flanks: 0,
                        parry: 0,
                        cover: '',
                        parryDR: '',
                        dr: ''
                    }
                }],
                maxRange: 0,
                favorInfo: {
                    favor: 0,
                    anointed: 0,
                    maxFavor: 0
                },
                nerveAndVitalityInfo: {
                    vitalityNNerveCalcInfo: {
                        vitalityDie: '',
                        minVitality: 0,
                        nerveDie: '',
                        minNerve: 0
                    },
                    nerve: 0,
                    stress: 0,
                    relaxation: 0,
                    fatigue: 0,
                    vitality: 0,
                    wounds: [],
                    sizeMod: 0
                }
            },
            abilitiesNBurdensInfo: {
                abilityOne: '',
                abilityTwo: '',
                removedAbility: '',
                burdens: '',
            }
        },
        pageTwoInfo: {
            gearInfo: {
                copper: 0,
                silver: 0,
                gold: 0,
                platinum: 0,
                carry: 0,
                gear: []
            },
            skillInfo: {
                skillSuites: [
                    { id: 1, skill: 'Athletics', cost: 30, isTrained: true, rank: 0, mod: 0 },
                    { id: 2, skill: 'Lore', cost: 30, isTrained: true, rank: 0, mod: 0 },
                    { id: 5, skill: 'Strategy', cost: 30, isTrained: true, rank: 0, mod: 0 },
                    { id: 3, skill: 'Streetwise', cost: 30, isTrained: true, rank: 0, mod: 0 },
                    { id: 4, skill: 'Survival', cost: 30, isTrained: true, rank: 0, mod: 0 },
                    { id: 6, skill: 'Trades', cost: 30, isTrained: true, rank: 0, mod: 0 },
                    { id: 7, skill: 'Weirdcraft', cost: 30, isTrained: true, rank: 0, mod: 0 }
                ],
                advancedSkills: [],
                nativeLanguage: { skill: '', cost: 0, rank: 0, mod: 0 },
                checkMods: {
                    str: 0,
                    dex: 0,
                    con: 0,
                    int: 0,
                    will: 0,
                    pre: 0,
                },
                adepts: 0
            },
            combatWorkspaceInfo: {
                armorInfo: {
                    id: 0,
                    name: '',
                    dr: '',
                    skillAdj: 0,
                    bonus: '',
                    modifiers: {
                        def: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        },
                        fat: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        },
                        rec: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        },
                        init: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        }
                    }
                },
                shieldInfo: {
                    id: 0,
                    name: '',
                    dr: '',
                    size: '',
                    cover: '',
                    flanks: 0,
                    bonus: '',
                    modifiers: {
                        def: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        },
                        fat: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        },
                        pry: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        },
                        brk: {
                            base: 0,
                            skill: 0,
                            misc: 0,
                            total: 0
                        }
                    }
                },
                combatSkillInfo: {
                    combatSkillSuites: [
                        { id: 1, skill: 'Armor', cost: 40, isTrained: true, rank: 0 },
                        { id: 2, skill: 'Melee', cost: 40, isTrained: true, rank: 0 },
                        { id: 3, skill: 'Ranged', cost: 40, isTrained: true, rank: 0 },
                        { id: 4, skill: 'Shields', cost: 40, isTrained: true, rank: 0 },
                        { id: 5, skill: 'Unarmed', cost: 40, isTrained: true, rank: 0 }
                    ],
                    combatAdvSkills: [],
                    martialAdepts: 0,
                    combatStatModifiers: {
                        atk: 0,
                        def: 0,
                        rec: 0,
                        dam: 0
                    },
                },
                weaponInfo: []
            }
        },
        generalNotes: {
            notes: '',
            isSecret: false
        }
    }

    checkForContentTypeBeforeSending(response, character)
}