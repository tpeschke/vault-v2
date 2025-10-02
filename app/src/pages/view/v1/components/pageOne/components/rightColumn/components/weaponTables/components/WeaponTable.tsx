import { WeaponTable } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import '../WeaponsTables.css'
import { ToggleIsThrownFunction } from '../../../../../../../hooks/interfaces/UpdateWeaponInterfaces'

interface Props {
    weapon: WeaponTable,
    weaponPosition: number,
    maxRange: number,
    toggleIsThrown: ToggleIsThrownFunction
}

export default function WeaponsTable({ weapon, weaponPosition, maxRange, toggleIsThrown }: Props) {
    const { name, attacks, defenses } = weapon
    const { meas, atk, damage, type, rec, init } = attacks
    const { def, flanks, parry, cover, parryDR, dr } = defenses

    const isRanged = weaponPosition === 4

    function DamageRow(damageString: string, isRanged: boolean) {
        if (isRanged) {
            return (
                <span className='damage-shell'>
                    <strong>Damage</strong>
                    <div onClick={toggleIsThrown} data-tooltip-id="my-tooltip" data-tooltip-content="Add / Remove Str Modifier">
                        <p className='fake-button'>{damageString}</p>
                    </div>
                </span>
            )
        }
        return (
            <span className='damage-shell'>
                <strong>Damage</strong>
                <p>{damageString}</p>
            </span>
        )
    }

    return (
        <div className='weapons-table-shell'>
            <p>{name}</p>
            <div>
                <div className='weapon-table-column'>
                    <h4>Attacks</h4>
                    {WeaponTableRow(isRanged ? 'RI' : 'Meas', isRanged ? maxRange / 6 : meas)}
                    {WeaponTableRow('Atk', atk)}
                    {DamageRow(damage, isRanged)}
                    {WeaponTableRow('Type', type)}
                    {WeaponTableRow('Rec', rec)}
                    {WeaponTableRow('Init', init)}
                </div>
                <div className='weapon-table-column'>
                    <h4>Defenses</h4>
                    {WeaponTableRow('Def', def)}
                    {WeaponTableRow('Flanks', flanks)}
                    {WeaponTableRow('Parry', parry)}
                    {DoubleWeaponRow('Cover', cover)}
                    {DoubleWeaponRow('Parry DR', parryDR)}
                    {DoubleWeaponRow('DR', dr)}
                </div>
            </div>
        </div>
    )
}

function WeaponTableRow(title: string, value: string | number) {
    return (
        <span>
            <strong>{title}</strong>
            <p>{value}</p>
        </span>
    )
}

function DoubleWeaponRow(title: string, value: string | number) {
    return (
        <span className='double-row'>
            <strong>{title}</strong>
            <p>{value}</p>
        </span>
    )
}