import '../WeaponsTables.css'

interface Props {
    weaponPosition: number
}

export default function WeaponsTable({ weaponPosition }: Props) {
    const isRanged = weaponPosition === 4

    // ADD FLANKS

    return (
        <div className='weapons-table-shell'>
            <p>Long Sword</p>
            <div>
                <div className='weapon-table-column'>
                    <h4>Attacks</h4>
                    {WeaponTableRow(isRanged ? 'RI' : 'Meas', 3.75)}
                    {WeaponTableRow('Atk', 1)}
                    {DamageRow('3d3! +1d4! -2', isRanged)}
                    {WeaponTableRow('Type', 'S')}
                    {WeaponTableRow('Rec', 15)}
                    {WeaponTableRow('Init', 5)}
                </div>
                <div className='weapon-table-column'>
                    <h4>Defenses</h4>
                    {WeaponTableRow('Def', 0)}
                    {WeaponTableRow('Flanks', 1)}
                    {WeaponTableRow('Parry', 8)}
                    {DoubleWeaponRow('Cover', 0)}
                    {DoubleWeaponRow('Parry DR', '2/d')}
                    {DoubleWeaponRow('DR', '1/d+3')}
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

function DamageRow(damageString: string, isRanged: boolean) {
    if (isRanged) {
        return (
            <span className='damage-shell'>
                <strong>Damage</strong>
                <div data-tooltip-id="my-tooltip" data-tooltip-content="Add / Remove Str Modifier">
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

function DoubleWeaponRow(title: string, value: string | number) {
    return (
        <span className='double-row'>
            <strong>{title}</strong>
            <p>{value}</p>
        </span>
    )
}