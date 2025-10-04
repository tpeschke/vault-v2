import { WeaponInfo } from '@vault/common/interfaces/v1/pageTwo/weaponInterfaces'
import './WeaponWorkspace.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { WeaponUpdates } from '../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'

interface Props {
    weaponInfo: WeaponInfo,
    index: number,
    isRanged?: boolean,
    weaponUpdates: WeaponUpdates
}

export default function WeaponWorkspace({ weaponInfo, index, isRanged = false, weaponUpdates }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, damage, recovery, size, measure, parry, type, bonus, traits, modifiers } = weaponInfo
    const { atk, rec, pry, dam } = modifiers
    const { updateBasicWeaponInfo, updateWeaponModifier } = weaponUpdates

    return (
        <div className='weapon-workspace-shell workspace'>
            {isEditing ?
                <input onChange={(event: any) => updateBasicWeaponInfo(index, 'name', event.target.value)} value={name} />
                :
                <p>{name}</p>
            }
            <span>
                <strong>Damage</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateBasicWeaponInfo(index, 'damage', event.target.value)} value={damage} />
                    :
                    <p>{damage}</p>
                }
            </span>
            <span>
                <span>
                    <strong>Rec</strong>
                    {isEditing ?
                        <input onChange={(event: any) => updateBasicWeaponInfo(index, 'recovery', +event.target.value)} value={recovery} />
                        :
                        <p>{recovery}</p>
                    }
                </span>
                <span>
                    <strong>Size</strong>
                    {isEditing ?
                        <input onChange={(event: any) => updateBasicWeaponInfo(index, 'size', event.target.value)} value={size} />
                        :
                        <p>{size}</p>
                    }
                </span>
            </span>
            {!isRanged &&
                <span>
                    <span>
                        <strong>Meas</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateBasicWeaponInfo(index, 'measure', +event.target.value)} value={measure} />
                            :
                            <p>{measure}</p>
                        }
                    </span>
                    <span>
                        <strong>Parry</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateBasicWeaponInfo(index, 'parry', +event.target.value)} value={parry} />
                            :
                            <p>{parry}</p>
                        }
                    </span>
                </span>
            }
            <span>
                <strong>Type</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateBasicWeaponInfo(index, 'type', event.target.value)} value={type} />
                    :
                    <p>{type}</p>
                }
            </span>
            <span className={`bonus-shell ${isRanged ? 'ranged-bonus' : ''}`}>
                <strong>Bonus</strong>
                {isEditing ?
                    <textarea onChange={(event: any) => updateBasicWeaponInfo(index, 'bonus', event.target.value)} value={bonus} />
                    :
                    <p>{bonus}</p>
                }
            </span>
            <span className='bonus-shell trait-shell'>
                <strong>Traits</strong>
                {isEditing ?
                    <textarea onChange={(event: any) => updateBasicWeaponInfo(index, 'traits', event.target.value)} value={traits} />
                    :
                    <p>{traits}</p>
                }
            </span>
            <table>
                <thead>
                    <tr>
                        <th>Atk</th>
                        <th>Rec</th>
                        <th>Pry</th>
                        <th>Dam</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {isEditing ?
                            <>
                                <td>
                                    <input onChange={(event: any) => updateWeaponModifier(index, 'atk', 'skill', +event.target.value)} defaultValue={atk.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateWeaponModifier(index, 'rec', 'skill', +event.target.value)} defaultValue={rec.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateWeaponModifier(index, 'pry', 'skill', +event.target.value)} defaultValue={pry.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateWeaponModifier(index, 'dam', 'skill', +event.target.value)} defaultValue={dam.skill ?? undefined} />
                                </td>
                            </>
                            :
                            <>
                                <td>{atk.skill}</td>
                                <td>{rec.skill}</td>
                                <td>{pry.skill}</td>
                                <td>{dam.skill}</td>
                            </>
                        }
                        <td><strong>Skill</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <input onChange={(event: any) => updateWeaponModifier(index, 'atk', 'misc', +event.target.value)} defaultValue={atk.misc ?? undefined} />
                        </td>
                        <td>
                            <input onChange={(event: any) => updateWeaponModifier(index, 'rec', 'misc', +event.target.value)} defaultValue={rec.misc ?? undefined} />
                        </td>
                        <td>
                            <input onChange={(event: any) => updateWeaponModifier(index, 'pry', 'misc', +event.target.value)} defaultValue={pry.misc ?? undefined} />
                        </td>
                        <td>
                            <input onChange={(event: any) => updateWeaponModifier(index, 'dam', 'misc', +event.target.value)} defaultValue={dam.misc ?? undefined} />
                        </td>
                        <td><strong>Misc</strong></td>
                    </tr>
                    <tr className='total-row'>
                        <td>{atk.total}</td>
                        <td>{rec.total}</td>
                        <td>{pry.total}</td>
                        <td>{dam.total}</td>
                        <td><strong>Total</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}