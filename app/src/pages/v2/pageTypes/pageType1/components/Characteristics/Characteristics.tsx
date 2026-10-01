import './Characteristics.css'
import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import CapacityDisplay from './components/capacity/Capacity'
import SocialSuitesDisplay from './components/socialSuites/SocialSuites'
import StrengthNDiscount from './components/strengthNDiscount/StrengthNDiscount'
import ReputationDisplay from './components/reputation/ReputationDisplay'
import FlawsDisplay from './components/flaws/Flaws'
import DescriptionsDisplay from './components/descriptions/Descriptions'

interface Props {
    characteristicsInfo: Characteristics
}

export default function CharacteristicsDisplay({ characteristicsInfo }: Props) {
    const { capacity, socialSuites, culturalStrength, socialSkillDiscount, currentEmotions, reputations, descriptions, flaws } = characteristicsInfo

    return (
        <div className="characteristics-display-v2">
            <CapacityDisplay capacity={capacity} />

            <h2>Current Emotions</h2>
            <div className='line-shell'>
                <p>{currentEmotions}</p>
            </div>

            <SocialSuitesDisplay socialSuites={socialSuites} />
            <ReputationDisplay reputations={reputations} />
            <StrengthNDiscount culturalStrength={culturalStrength} socialSkillDiscount={socialSkillDiscount} />
            <DescriptionsDisplay descriptions={descriptions} />
            <FlawsDisplay flaws={flaws} />
        </div>
    )
}
