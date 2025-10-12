import { WeaponTable } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import WeaponsTable from './components/WeaponTable'
import './WeaponsTables.css'
import { ToggleIsThrownFunction } from '../../../../../../hooks/interfaces/pageOneInterfaces/UpdateWeaponInterfaces'

interface Props {
    weapons: WeaponTable[],
    maxRange: number,
    toggleIsThrown: ToggleIsThrownFunction
}

export default function WeaponsTables({ weapons, maxRange, toggleIsThrown }: Props) {
    return (
        <div className='weapons-tables-shell'>
            {weapons.map((weapon, index) => <WeaponsTable key={index} weapon={weapon} weaponPosition={index + 1} maxRange={maxRange} toggleIsThrown={toggleIsThrown} />)}
        </div>
    )
}