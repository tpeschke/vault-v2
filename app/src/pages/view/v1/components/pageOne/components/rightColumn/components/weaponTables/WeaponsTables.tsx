import WeaponsTable from './components/WeaponTable'
import './WeaponsTables.css'

interface Props {

}

export default function WeaponsTables({ }: Props) {
    const weapons = [null, null, null, null]
    return (
        <div className='weapons-tables-shell'>
            {weapons.map((weapon, index) => <WeaponsTable key={index} weaponPosition={index + 1} />)}
        </div>
    )
}