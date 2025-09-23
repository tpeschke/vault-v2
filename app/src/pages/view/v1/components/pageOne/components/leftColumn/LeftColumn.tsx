import { LeftColumnInfo } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import CharacteristicsDisplay from './components/characteristics/CharacteristicsDisplay'
import MovementDisplay from './components/MovementDisplay'
import StatsDisplay from './components/StatsDisplay'
import './LeftColumn.css'

interface Props {
    leftColumnInfo: LeftColumnInfo,
    isEditing: boolean
}

export default function LeftColumn({ leftColumnInfo, isEditing }: Props) {
    const { statInfo, movementInfo, characteristicInfo } = leftColumnInfo
    return (
        <div className='left'>
            <div className='flex-pair'>
                <StatsDisplay statInfo={statInfo} isEditing={isEditing}/>
                <MovementDisplay movementInfo={movementInfo} isEditing={isEditing}/>
            </div>
            <CharacteristicsDisplay characteristicInfo={characteristicInfo} isEditing={isEditing}/>
        </div>
    )
}