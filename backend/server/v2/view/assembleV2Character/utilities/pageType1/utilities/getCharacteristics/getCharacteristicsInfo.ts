import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo";
import getBasicCharacteristics from "./utilities/getBasicCharacteristics";
import getGoals from "./utilities/getGoals";
import getReputations from "./utilities/getReputations";
import getConvictions from "./utilities/getConvictions";
import getRelationships from "./utilities/getRelationships";
import getFlaws from "./utilities/getFlaws";

export default async function getCharacteristicsInfo(characterID: number): Promise<Characteristics> {
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
        getBasicCharacteristics(characterID).then(basicCharacteristics => {
            return {
                ...characteristicInfo,
                ...basicCharacteristics
            }
        }),
        getGoals(characterID).then(goals => characteristicInfo.goals = goals),
        getReputations(characterID).then(reputations => characteristicInfo.reputations = reputations),
        getConvictions(characterID).then(convictions => characteristicInfo.convictions = convictions),
        getRelationships(characterID).then(relationships => characteristicInfo.relationships = relationships),
        getFlaws(characterID).then(flaws => characteristicInfo.flaws = flaws)
    ])
    
    return characteristicInfo
}