import { LeftColumnInfo } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import CharacteristicsDisplay from './components/characteristics/CharacteristicsDisplay'
import MovementDisplay from './components/MovementDisplay'
import StatsDisplay from './components/StatsDisplay'
import './LeftColumn.css'

interface Props {
    leftColumnInfo: LeftColumnInfo
}

export default function LeftColumn({ leftColumnInfo }: Props) {
    const { statInfo, movementInfo, characteristicInfo } = leftColumnInfo
    return (
        <div className='left'>
            <div className='flex-pair'>
                <StatsDisplay statInfo={statInfo}/>
                <MovementDisplay movementInfo={movementInfo}/>
            </div>
            <CharacteristicsDisplay characteristicInfo={characteristicInfo}/>
        </div>
    )
}