import WeaponsTables from './components/weaponTables/WeaponsTables'
import './RightColumn.css'

interface Props {

}

export default function RightColumn({ }: Props) {
    return (
        <div className='right'>
            <WeaponsTables />
        </div>
    )
}