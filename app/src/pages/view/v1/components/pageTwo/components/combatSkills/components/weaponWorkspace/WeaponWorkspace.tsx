import { WeaponInfo } from '@vault/common/interfaces/v1/pageTwo/weaponInterfaces'
import './WeaponWorkspace.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'

interface Props {
    weaponInfo: WeaponInfo,
    isRanged?: boolean
}

export default function WeaponWorkspace({ weaponInfo, isRanged = false }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, damage, recovery, size, measure, parry, type, bonus, traits, modifiers } = weaponInfo

    const { atk, rec, pry, dam } = modifiers

    function placeholderFunction() {

    }

    return (
        <div className='weapon-workspace-shell workspace'>
            {isEditing ?
                <input value={name} />
                :
                <p>{name}</p>
            }
            <span>
                <strong>Damage</strong>
                {isEditing ?
                    <input value={damage} />
                    :
                    <p>{damage}</p>
                }
            </span>
            <span>
                <span>
                    <strong>Rec</strong>
                    {isEditing ?
                        <input value={recovery} />
                        :
                        <p>{recovery}</p>
                    }
                </span>
                <span>
                    <strong>Size</strong>
                    {isEditing ?
                        <input value={size} />
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
                            <input value={measure} />
                            :
                            <p>{measure}</p>
                        }
                    </span>
                    <span>
                        <strong>Parry</strong>
                        {isEditing ?
                            <input value={parry} />
                            :
                            <p>{parry}</p>
                        }
                    </span>
                </span>
            }
            <span>
                <strong>Type</strong>
                {isEditing ?
                    <input value={type} />
                    :
                    <p>{type}</p>
                }
            </span>
            <span className={`bonus-shell ${isRanged ? 'ranged-bonus' : ''}`}>
                <strong>Bonus</strong>
                {isEditing ?
                    <textarea value={bonus} />
                    :
                    <p>{bonus}</p>
                }
            </span>
            <span className='bonus-shell trait-shell'>
                <strong>Traits</strong>
                {isEditing ?
                    <textarea value={traits} />
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
                                    <input onClick={placeholderFunction} defaultValue={atk.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={rec.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={pry.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={dam.skill ?? undefined} />
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
                            <input onClick={placeholderFunction} defaultValue={atk.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={rec.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={pry.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={dam.misc ?? undefined} />
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