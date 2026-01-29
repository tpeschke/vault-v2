import './Characteristics.css'
import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import CapacityDisplay from './components/Capacity'

interface Props {
    characteristicsInfo: Characteristics
}

export default function CharacteristicsDisplay({ characteristicsInfo }: Props) {
    const { capacity } = characteristicsInfo
    return (
        <div className="characteristics-display-v2">
            <CapacityDisplay capacity={capacity} />
        </div>
    )
}