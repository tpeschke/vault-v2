import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo";
import getBasicCharacteristics from "./utilities/getBasicCharacteristics";
import getGoals from "./utilities/getGoals";
import getReputations from "./utilities/getReputations";
import getConvictions from "./utilities/getConvictions";
import getRelationships from "./utilities/getRelationships";
import getFlaws from "./utilities/getFlaws";
import getSocialSuites from "./utilities/getSocialSuites";

export default async function getCharacteristicsInfo(pageID: number): Promise<Characteristics> {
    let characteristicInfo: Characteristics = {
        capacity: 0,
        culturalStrength: '',
        socialSkillDiscount: 0,
        temperaments: {
            affability: '',
            openness: '',
            outgoingness: '',
            workEthic: '',
            worry: '',
        },
        goals: [],
        reputations: [],
        convictions: [],
        relationships: [],
        flaws: [],
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
    }

    await Promise.all([
        getBasicCharacteristics(pageID).then(basicCharacteristics => {
            return {
                ...characteristicInfo,
                ...basicCharacteristics
            }
        }),
        getGoals(pageID).then(goals => characteristicInfo.goals = goals),
        getReputations(pageID).then(reputations => characteristicInfo.reputations = reputations),
        getConvictions(pageID).then(convictions => characteristicInfo.convictions = convictions),
        getRelationships(pageID).then(relationships => characteristicInfo.relationships = relationships),
        getFlaws(pageID).then(flaws => characteristicInfo.flaws = flaws),
        getSocialSuites(pageID).then(socialSuites => characteristicInfo.socialSuites = socialSuites)
    ])
    
    return characteristicInfo
}