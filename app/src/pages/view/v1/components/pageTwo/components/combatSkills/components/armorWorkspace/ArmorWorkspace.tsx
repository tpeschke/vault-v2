import { ArmorInfo } from '@vault/common/interfaces/v1/pageTwo/armorInterfaces'
import './ArmorWorkspace.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'

interface Props {
    armorInfo: ArmorInfo
}

export default function ArmorWorkspace({ armorInfo }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, dr, skillAdj, bonus, modifiers } = armorInfo

    const { def, fat, rec, init } = modifiers

    function placeholderFunction() {

    }

    return (
        <div className='armor-workspace-shell'>
            <h3>Armor Workspace</h3>
            {isEditing ?
                <input value={name} />
                :
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Click to Toggle Whether Armor is Factored into Weapon Tables." className='workspace-button'>{name}</button>
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
                <strong>Skill Adj</strong>
                {isEditing ?
                    <input value={skillAdj} />
                    :
                    <p>{skillAdj}</p>
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
                        <th>Rec</th>
                        <th>Init</th>
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
                                    <input onClick={placeholderFunction} defaultValue={rec.base ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={init.base ?? undefined} />
                                </td>
                            </>
                            :
                            <>
                                <td>{def.base}</td>
                                <td>{fat.base}</td>
                                <td>{rec.base}</td>
                                <td>{init.base}</td>
                            </>
                        }
                        <td><strong>Base</strong></td>
                    </tr>
                    <tr>
                        {isEditing ?
                            <>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={def.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={fat.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={rec.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onClick={placeholderFunction} defaultValue={init.skill ?? undefined} />
                                </td>
                            </>
                            :
                            <>
                                <td>{def.skill}</td>
                                <td>{fat.skill}</td>
                                <td>{rec.skill}</td>
                                <td>{init.skill}</td>
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
                            <input onClick={placeholderFunction} defaultValue={rec.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={init.misc ?? undefined} />
                        </td>
                        <td><strong>Misc</strong></td>
                    </tr>
                    <tr className='total-row'>
                        <td>{def.total}</td>
                        <td>{fat.total}</td>
                        <td>{rec.total}</td>
                        <td>{init.total}</td>
                        <td><strong>Total</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}