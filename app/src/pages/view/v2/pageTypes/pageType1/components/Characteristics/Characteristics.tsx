import './Characteristics.css'
import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import CapacityDisplay from './components/capacity/Capacity'
import TemperamentsDisplay from './components/temperaments/Temperaments'
import SocialSuitesDisplay from './components/socialSuites/SocialSuites'

interface Props {
    characteristicsInfo: Characteristics
}

export default function CharacteristicsDisplay({ characteristicsInfo }: Props) {
    const { capacity, goals, temperaments, socialSuites } = characteristicsInfo
    
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
        </div>
    )
}