import { RightColumnInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import FavorDisplay from './components/favorVitalityNRanges/FavorDisplay'
import RangeDisplay from './components/favorVitalityNRanges/RangeDisplay'
import VitalityNNerveCalcDisplay from './components/favorVitalityNRanges/VitalityNNerveCalcDisplay'
import NerveDisplay from './components/nerveDisplay/NerveDisplay'
import VitalityDisplay from './components/vitalityDisplay/VitalityDisplay'
import WeaponsTables from './components/weaponTables/WeaponsTables'
import './RightColumn.css'
import { PageOneRightColumn } from '../../../../hooks/interfaces/CharacterHookInterfaces'

interface Props {
    rightColumnInfo: RightColumnInfo,
    rightColumnUpdateFunctions: PageOneRightColumn
}

export default function RightColumn({ rightColumnInfo, rightColumnUpdateFunctions }: Props) {
    const { weapons, maxRange, favorInfo, nerveAndVitalityInfo } = rightColumnInfo
    const { vitalityNNerveCalcInfo } = nerveAndVitalityInfo
    const { toggleIsThrown, updateFavorInfo, updateVitalityNNerve, updateMaxRange, updateNerveAndVitalityInfo } = rightColumnUpdateFunctions

    return (
        <div className='right'>
            <WeaponsTables weapons={weapons} maxRange={maxRange} toggleIsThrown={toggleIsThrown}/>
            <div className="columns">
                <div className='left'>
                    <FavorDisplay favorInfo={favorInfo} updateFavorInfo={updateFavorInfo}/>
                    <VitalityNNerveCalcDisplay vitalityNNerveCalcInfo={vitalityNNerveCalcInfo} updateVitalityNNerve={updateVitalityNNerve}/>
                </div>
                <RangeDisplay maxRange={maxRange} updateMaxRange={updateMaxRange} />
            </div>
            <NerveDisplay nerveAndVitalityInfo={nerveAndVitalityInfo} updateNerveAndVitalityInfo={updateNerveAndVitalityInfo}/>
            <VitalityDisplay nerveAndVitalityInfo={nerveAndVitalityInfo}/>
        </div>
    )
}