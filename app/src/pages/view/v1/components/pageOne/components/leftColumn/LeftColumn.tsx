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
    const { updateStat, updateMovement, characteristicUpdateFunctions } = leftColumnUpdateFunctions

    return (
        <div className='left'>
            <div className='flex-pair'>
                <StatsDisplay statInfo={statInfo} updateStat={updateStat}/>
                <MovementDisplay movementInfo={movementInfo} updateMovement={updateMovement}/>
            </div>
            <CharacteristicsDisplay characteristicInfo={characteristicInfo} characteristicUpdateFunctions={characteristicUpdateFunctions}/>
        </div>
    )
}