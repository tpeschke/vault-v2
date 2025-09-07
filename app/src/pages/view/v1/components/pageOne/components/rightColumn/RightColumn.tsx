import RangeDisplay from './components/favorVitalityNRanges/RangeDisplay'
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

                </div>
                <RangeDisplay />
            </div>
        </div>
    )
}