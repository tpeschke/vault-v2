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
    const rows = currentEmotions ?? []

    return (
        <div className="characteristics-display-v2">
            <CapacityDisplay capacity={capacity} />

            <h2>Current Emotions</h2>
            <div className="current-emotions-v2">
                {rows.slice(0, 6).map(({ id, value }) => (
                    <p key={id}>{value}</p>
                ))}
                {[...Array(Math.max(0, 6 - rows.length))].map((_, index) => (
                    <p key={index}></p>
                ))}
            </div>

            <SocialSuitesDisplay socialSuites={socialSuites} />
            <ReputationDisplay reputations={reputations} />
            <StrengthNDiscount culturalStrength={culturalStrength} socialSkillDiscount={socialSkillDiscount} />
            <DescriptionsDisplay descriptions={descriptions} />
            <FlawsDisplay flaws={flaws} />
        </div>
    )
}
