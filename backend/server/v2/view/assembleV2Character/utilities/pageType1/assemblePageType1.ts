import { Page1 } from "@vault/common/interfaces/v2/pageTypes";
import getGeneralInfo from "./utilities/getGeneralInfo";
import getStats from "./utilities/getStats";

export default async function assemblePageType1(characterID: number): Promise<Page1> {
    let basicPageSkeleton: Page1 = {
        type: 1,
        generalInfo: {
            name: '',
            ancestry: '',
            class: '',
            subclass: '',
            level: 0,
            crp: {
                unspent: 0,
                spent: 0,
                toLvl: 0
            }
        },
        stats: {
            str: 0,
            dex: 0,
            con: 0,
            mem: 0,
            ins: 0,
            pre: 0
        },
        characteristicsInfo: {
            capacity: 0,
            goals: [],
            culturalStrength: '',
            socialSkillDiscount: 0,
            reputations: [],
            convictions: [],
            relationships: [],
            flaws: [],
            temperaments: {
                affability: '',
                openness: '',
                outgoingness: '',
                workEthic: '',
                worry: '',
            },
            socialSuites: {
                empathize: {
                    stat: 0,
                    rank: 0,
                    descriptions: []
                },
                intimidate: {
                    stat: 0,
                    rank: 0,
                    descriptions: []
                },
                lecture: {
                    stat: 0,
                    rank: 0,
                    descriptions: []
                },
                tempt: {
                    stat: 0,
                    rank: 0,
                    descriptions: []
                },
            }
        },
        movement: {
            crawl: '',
            walk: '',
            jog: '',
            run: '',
            sprint: ''
        },
        vitalsInfo: {
            selfDoubt: {
                dieIndex: 0,
                threshold: 0,
                diePenalty: 0
            },
            damage: {
                dieIndex: 0,
                knockback: 0,
                damage: 0,
                threshold: 0
            },
            stress: {
                dieIndex: 0,
                stress: 0,
                threshold: 0
            }
        },
        favor: {
            anointed: false,
            current: 0,
            max: 0
        },
        combatInfo: {
            defenses: {
                name: '',
                initiative: 0,
                defense: 0,
                parry: 0,
                flanks: 0,
                cover: '',
                parryDR: '',
                dr: '',
                notes: ''
            },
            attacks: []
        }
    }

    await Promise.all([
        getGeneralInfo(characterID).then(generalInfo => basicPageSkeleton.generalInfo = generalInfo),
        getStats(characterID).then(stats => basicPageSkeleton.stats = stats)
    ])

    return basicPageSkeleton
}