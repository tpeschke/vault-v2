import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo";
import getBasicCharacteristics from "./utilities/getBasicCharacteristics";
import getGoals from "./utilities/getGoals";
import getReputations from "./utilities/getReputations";
import getRelationships from "./utilities/getRelationships";
import getFlaws from "./utilities/getFlaws";
import getSocialSuites from "./utilities/getSocialSuites";
import getDescriptions from "./utilities/getDescriptions";
import getCurrentEmotions from "./utilities/getCurrentEmotions";

export default async function getCharacteristicsInfo(pageID: number): Promise<Characteristics> {
    let characteristicInfo: Characteristics = {
        capacity: 0,
        culturalStrength: '',
        socialSkillDiscount: 0,
        currentEmotions: [],
        temperaments: {
            affability: '',
            openness: '',
            outgoingness: '',
            workEthic: '',
            worry: '',
        },
        goals: [],
        reputations: [],
        descriptions: [],
        relationships: [],
        flaws: [],
        socialSuites: {
            influence: {
                stat: 0,
                rank: 0,
                descriptions: []
            },
            intimidate: {
                stat: 0,
                rank: 0,
                descriptions: []
            },
            inform: {
                stat: 0,
                rank: 0,
                descriptions: []
            },
            inspire: {
                stat: 0,
                rank: 0,
                descriptions: []
            },
        }
    }

    await Promise.all([
        getBasicCharacteristics(pageID).then(basicCharacteristics => {
            characteristicInfo.capacity = basicCharacteristics.capacity
            characteristicInfo.culturalStrength = basicCharacteristics.culturalStrength
            characteristicInfo.socialSkillDiscount = basicCharacteristics.socialSkillDiscount
            characteristicInfo.temperaments = basicCharacteristics.temperaments
        }),
        getGoals(pageID).then(goals => characteristicInfo.goals = goals),
        getReputations(pageID).then(reputations => characteristicInfo.reputations = reputations),
        getCurrentEmotions(pageID).then(currentEmotions => characteristicInfo.currentEmotions = currentEmotions),
        getDescriptions(pageID).then(descriptions => characteristicInfo.descriptions = descriptions),
        getRelationships(pageID).then(relationships => characteristicInfo.relationships = relationships),
        getFlaws(pageID).then(flaws => characteristicInfo.flaws = flaws),
        getSocialSuites(pageID).then(socialSuites => characteristicInfo.socialSuites = socialSuites)
    ])
    
    return characteristicInfo
}