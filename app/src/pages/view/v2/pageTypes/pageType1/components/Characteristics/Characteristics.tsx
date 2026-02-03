import './Characteristics.css'
import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import CapacityDisplay from './components/capacity/Capacity'
import TemperamentsDisplay from './components/temperaments/Temperaments'
import SocialSuitesDisplay from './components/socialSuites/SocialSuites'
import StrengthNDiscount from './components/strengthNDiscount/StrengthNDiscount'
import ReputationDisplay from './components/reputation/ReputationDisplay'
import RelationshipsDisplay from './components/relationships/Relationships'
import FlawsDisplay from './components/flaws/Flaws'

interface Props {
    characteristicsInfo: Characteristics
}

export default function CharacteristicsDisplay({ characteristicsInfo }: Props) {
    const { capacity, goals, temperaments, socialSuites, culturalStrength, socialSkillDiscount, reputations, 
        relationships, flaws } = characteristicsInfo
    
    return (
        <div className="characteristics-display-v2">
            <CapacityDisplay capacity={capacity} />

            <h2>Goals</h2>
            <div className='line-shell'>
                {goals.map(({id, goal}) => <p key={id}>{goal}</p>)}
                {[...Array(3 - goals.length)].map((_, index) => <p key={index}></p>)}
            </div>

            <TemperamentsDisplay temperaments={temperaments} />
            <SocialSuitesDisplay socialSuites={socialSuites} />

            <StrengthNDiscount culturalStrength={culturalStrength} socialSkillDiscount={socialSkillDiscount} />

            <ReputationDisplay reputations={reputations} />
            <RelationshipsDisplay relationships={relationships} />
            <FlawsDisplay flaws={flaws} />
        </div>
    )
}