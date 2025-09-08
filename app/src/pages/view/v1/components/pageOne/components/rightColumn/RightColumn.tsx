import FavorDisplay from './components/favorVitalityNRanges/FavorDisplay'
import RangeDisplay from './components/favorVitalityNRanges/RangeDisplay'
import VitalityNNerveCalcDisplay from './components/favorVitalityNRanges/VitalityNNerveCalcDisplay'
import NerveDisplay from './components/nerveDisplay/NerveDisplay'
import VitalityDisplay from './components/vitalityDisplay/VitalityDisplay'
import WeaponsTables from './components/weaponTables/WeaponsTables'
import './RightColumn.css'

interface Props {

}

export default function RightColumn({ }: Props) {
    return (
        <div className='right'>
            <WeaponsTables />
            <div className="columns">
                <div className='left'>
                    <FavorDisplay />
                    <VitalityNNerveCalcDisplay />
                </div>
                <RangeDisplay />
            </div>
            <NerveDisplay />
            <VitalityDisplay />
        </div>
    )
}