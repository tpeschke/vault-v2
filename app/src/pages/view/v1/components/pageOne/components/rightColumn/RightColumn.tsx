import { RightColumnInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import FavorDisplay from './components/favorVitalityNRanges/FavorDisplay'
import RangeDisplay from './components/favorVitalityNRanges/RangeDisplay'
import VitalityNNerveCalcDisplay from './components/favorVitalityNRanges/VitalityNNerveCalcDisplay'
import NerveDisplay from './components/nerveDisplay/NerveDisplay'
import VitalityDisplay from './components/vitalityDisplay/VitalityDisplay'
import WeaponsTables from './components/weaponTables/WeaponsTables'
import './RightColumn.css'

interface Props {
    rightColumnInfo: RightColumnInfo
}

export default function RightColumn({ rightColumnInfo }: Props) {
    const { weapons, maxRange, favorInfo, nerveAndVitalityInfo } = rightColumnInfo

    const { vitalityNNerveCalcInfo } = nerveAndVitalityInfo

    return (
        <div className='right'>
            <WeaponsTables weapons={weapons}/>
            <div className="columns">
                <div className='left'>
                    <FavorDisplay favorInfo={favorInfo} />
                    <VitalityNNerveCalcDisplay  vitalityNNerveCalcInfo={vitalityNNerveCalcInfo}/>
                </div>
                <RangeDisplay maxRange={maxRange} />
            </div>
            <NerveDisplay nerveAndVitalityInfo={nerveAndVitalityInfo}/>
            <VitalityDisplay nerveAndVitalityInfo={nerveAndVitalityInfo}/>
        </div>
    )
}