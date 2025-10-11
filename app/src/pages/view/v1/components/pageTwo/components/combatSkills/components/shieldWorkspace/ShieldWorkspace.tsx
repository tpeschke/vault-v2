import { ShieldInfo } from '@vault/common/interfaces/v1/pageTwo/shieldInterfaces'
import './ShieldWorkspace.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { ShieldUpdates } from '../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'

interface Props {
    shieldInfo?: ShieldInfo,
    shieldUpdates: ShieldUpdates
}

export default function ShieldWorkspace({ shieldInfo, shieldUpdates }: Props) {
    const isEditing = useContext(EditingContext)

    if (shieldInfo) {
        const { name, dr, size, cover, flanks, bonus, modifiers } = shieldInfo
        const { def, fat, pry, brk } = modifiers
        const { updateBasicShieldInfo, updateShieldModifier } = shieldUpdates

        return (
            <div className='shield-workspace-shell'>
                <h3>Shield Workspace</h3>
                {isEditing ?
                    <input onChange={(event: any) => updateBasicShieldInfo('name', event.target.value)} value={name} />
                    :
                    <p className='workspace-heading '>{name}</p>
                }
                <span>
                    <strong>DR</strong>
                    {isEditing ?
                        <input onChange={(event: any) => updateBasicShieldInfo('dr', event.target.value)} value={dr} />
                        :
                        <p>{dr}</p>
                    }
                </span>
                <span>
                    <strong>Size</strong>
                    {isEditing ?
                        <input onChange={(event: any) => updateBasicShieldInfo('size', event.target.value)} value={size} />
                        :
                        <p>{size}</p>
                    }
                </span>
                <span>
                    <strong>Flanks</strong>
                    {isEditing ?
                        <input type='number' onChange={(event: any) => updateBasicShieldInfo('flanks', +event.target.value)} value={flanks} />
                        :
                        <p>{flanks}</p>
                    }
                </span>
                <span>
                    <strong>Cover</strong>
                    {isEditing ?
                        <input onChange={(event: any) => updateBasicShieldInfo('cover', event.target.value)} value={cover} />
                        :
                        <p>{cover}</p>
                    }
                </span>
                <span className='bonus-shell'>
                    <strong>Bonus</strong>
                    {isEditing ?
                        <textarea onChange={(event: any) => updateBasicShieldInfo('bonus', event.target.value)} value={bonus} />
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
                                        <input type='number' onChange={(event: any) => updateShieldModifier('def', 'base', +event.target.value)} defaultValue={def.base ?? undefined} />
                                    </td>
                                    <td>
                                        <input type='number' onChange={(event: any) => updateShieldModifier('fat', 'base', +event.target.value)} defaultValue={fat.base ?? undefined} />
                                    </td>
                                    <td>
                                        <input type='number' onChange={(event: any) => updateShieldModifier('pry', 'base', +event.target.value)} defaultValue={pry.base ?? undefined} />
                                    </td>
                                    <td>
                                        <input type='number' onChange={(event: any) => updateShieldModifier('brk', 'base', +event.target.value)} defaultValue={brk.base ?? undefined} />
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
                                        <input type='number' onChange={(event: any) => updateShieldModifier('fat', 'skill', +event.target.value)} defaultValue={fat.skill ?? undefined} />
                                    </td>
                                    <td>
                                        <input type='number' onChange={(event: any) => updateShieldModifier('pry', 'skill', +event.target.value)} defaultValue={pry.skill ?? undefined} />
                                    </td>
                                    <td>
                                        <input type='number' onChange={(event: any) => updateShieldModifier('brk', 'skill', +event.target.value)} defaultValue={brk.skill ?? undefined} />
                                    </td>
                                </>
                                :
                                <>
                                    <td> </td>
                                    <td>{fat.skill}</td>
                                    <td>{pry.skill}</td>
                                    <td>{brk.skill}</td>
                                </>
                            }
                            <td><strong>Skill</strong></td>
                        </tr>
                        <tr>
                            <td>
                                <input type='number' onChange={(event: any) => updateShieldModifier('def', 'misc', +event.target.value)} defaultValue={def.misc ?? undefined} />
                            </td>
                            <td>
                                <input type='number' onChange={(event: any) => updateShieldModifier('fat', 'misc', +event.target.value)} defaultValue={fat.misc ?? undefined} />
                            </td>
                            <td>
                                <input type='number' onChange={(event: any) => updateShieldModifier('pry', 'misc', +event.target.value)} defaultValue={pry.misc ?? undefined} />
                            </td>
                            <td>
                                <input type='number' onChange={(event: any) => updateShieldModifier('brk', 'misc', +event.target.value)} defaultValue={brk.misc ?? undefined} />
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

    return (
        <div className='shield-workspace-shell'>
            <h3>Shield Workspace</h3>
            <p className='workspace-heading '></p>
            <span>
                <strong>DR</strong>
                <p> </p>
            </span>
            <span>
                <strong>Size</strong>
                <p> </p>
            </span>
            <span>
                <strong>Flanks</strong>
                <p> </p>
            </span>
            <span>
                <strong>Cover</strong>
                <p> </p>
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                <p> </p>
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
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><strong>Base</strong></td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><strong>Skill</strong></td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><strong>Misc</strong></td>
                    </tr>
                    <tr className='total-row'>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><strong>Total</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}