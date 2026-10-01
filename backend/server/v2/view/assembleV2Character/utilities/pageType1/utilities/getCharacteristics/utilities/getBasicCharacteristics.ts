import query from "../../../../../../../../db/database"

interface RawBasicCharacteristics {
    capacity: number,
    culturalstrength: string,
    socialskilldiscount: number,
    currentemotions: string,
    affability: string,
    openness: string,
    outgoingness: string,
    workethic: string,
    worry: string,
}

interface BasicCharacteristicReturn {
    capacity: number,
    culturalStrength: string,
    socialSkillDiscount: number,
    currentEmotions: string,
    temperaments: {
        affability: string,
        openness: string,
        outgoingness: string,
        workEthic: string,
        worry: string,
    }
}

const getBasicCharacteristicsSQL = `select * from v2BasicCharacteristics where pageID = $1`

export default async function getBasicCharacteristics(pageID: number): Promise<BasicCharacteristicReturn> {
    const [info]: RawBasicCharacteristics[] = await query(getBasicCharacteristicsSQL, pageID)

    if (info) {
        const {
            capacity, culturalstrength: culturalStrength, socialskilldiscount: socialSkillDiscount,
            currentemotions: currentEmotions,
            affability, openness, outgoingness, workethic: workEthic, worry
        } = info

        return {
            capacity, culturalStrength, socialSkillDiscount, currentEmotions: currentEmotions ?? '',
            temperaments: {
                affability, openness, outgoingness, workEthic, worry,
            }
        }
    }

    return {
        capacity: 0,
        culturalStrength: '',
        socialSkillDiscount: 0,
        currentEmotions: '',
        temperaments: {
            affability: '',
            openness: '',
            outgoingness: '',
            workEthic: '',
            worry: '',
        }
    }
}