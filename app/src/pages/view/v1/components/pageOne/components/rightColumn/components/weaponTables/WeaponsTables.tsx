import { WeaponTable } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import WeaponsTable from './components/WeaponTable'
import './WeaponsTables.css'

interface Props {
    weapons: WeaponTable[],
    maxRange: number
}

export default function WeaponsTables({ weapons, maxRange }: Props) {
    return (
        <div className='weapons-tables-shell'>
            {weapons.map((weapon, index) => <WeaponsTable key={index} weapon={weapon} weaponPosition={index + 1} maxRange={maxRange} />)}
        </div>
    )
}