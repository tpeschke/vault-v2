import { LeftColumnInfo } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import CharacteristicsDisplay from './components/characteristics/CharacteristicsDisplay'
import MovementDisplay from './components/MovementDisplay'
import StatsDisplay from './components/StatsDisplay'
import './LeftColumn.css'
import { PageOneLeftColumn } from '../../../../hooks/interfaces/CharacterHookInterfaces'

interface Props {
    leftColumnInfo: LeftColumnInfo,
    leftColumnUpdateFunctions: PageOneLeftColumn
}

export default function LeftColumn({ leftColumnInfo, leftColumnUpdateFunctions }: Props) {
    const { statInfo, movementInfo, characteristicInfo } = leftColumnInfo
    const { updateStat } = leftColumnUpdateFunctions

    return (
        <div className='left'>
            <div className='flex-pair'>
                <StatsDisplay statInfo={statInfo} updateStat={updateStat}/>
                <MovementDisplay movementInfo={movementInfo}/>
            </div>
            <CharacteristicsDisplay characteristicInfo={characteristicInfo}/>
        </div>
    )
}