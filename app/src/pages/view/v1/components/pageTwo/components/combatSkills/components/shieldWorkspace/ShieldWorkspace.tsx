import { ShieldInfo } from '@vault/common/interfaces/v1/pageTwo/shieldInterfaces'
import './ShieldWorkspace.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'

interface Props {
    shieldInfo: ShieldInfo
}

export default function ShieldWorkspace({ shieldInfo }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, dr, size, cover, flanks, bonus, modifiers } = shieldInfo

    const { def, fat, pry, brk } = modifiers

    function placeholderFunction() {

    }

    return (
        <div className='shield-workspace-shell'>
            <h3>Shield Workspace</h3>
            {isEditing ?
                <input value={name} />
                :
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Click to Toggle Whether Shield is Factored into Weapon Tables." className='workspace-button'>{name}</button>
            }
            <span>
                <strong>DR</strong>
                {isEditing ?
                    <input value={dr} />
                    :
                    <p>{dr}</p>
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
            <span>
                <strong>Flanks</strong>
                {isEditing ?
                    <input value={flanks} />
                    :
                    <p>{flanks}</p>
                }
            </span>
            <span>
                <strong>Cover</strong>
                {isEditing ?
                    <input value={cover} />
                    :
                    <p>{cover}</p>
                }
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                {isEditing ?
                    <textarea value={bonus} />
                    :
                    <p>{bonus}</p>
                }
            </span>
            <table>
                <thead>
                    <tr>
                        <th>Def</th>
                        <th>Fat</th>
                        <th>Pry</th>
                        <th>Brk</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {isEditing ?
                            <>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={def.base ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={fat.base ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={pry.base ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={brk.base ?? undefined} />
                                </td>
                            </>
                            :
                            <>
                                <td>{def.base}</td>
                                <td>{fat.base}</td>
                                <td>{pry.base}</td>
                                <td>{brk.base}</td>
                            </>
                        }
                        <td><strong>Base</strong></td>
                    </tr>
                    <tr>
                    {isEditing ?
                            <>
                                {/* Cannot modifier Def via Skill */}
                                <td> </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={fat.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={pry.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={brk.skill ?? undefined} />
                                </td>
                            </>
                            :
                            <>
                                <td> </td>
                                <td>{fat.base}</td>
                                <td>{pry.base}</td>
                                <td>{brk.base}</td>
                            </>
                        }
                        <td><strong>Skill</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={def.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={fat.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={pry.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={brk.misc ?? undefined} />
                        </td>
                        <td><strong>Misc</strong></td>
                    </tr>
                    <tr className='total-row'>
                        <td>{def.total}</td>
                        <td>{fat.total}</td>
                        <td>{pry.total}</td>
                        <td>{brk.total}</td>
                        <td><strong>Total</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}