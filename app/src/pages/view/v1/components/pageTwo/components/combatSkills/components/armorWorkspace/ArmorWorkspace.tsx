import { ArmorInfo } from '@vault/common/interfaces/v1/pageTwo/armorInterfaces'
import './ArmorWorkspace.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { ArmorUpdates } from '../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'

interface Props {
    armorInfo: ArmorInfo,
    armorUpdates: ArmorUpdates
}

export default function ArmorWorkspace({ armorInfo, armorUpdates }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, dr, skillAdj, bonus, modifiers } = armorInfo
    const { def, fat, rec, init } = modifiers

    const { updateBasicArmorInfo, updateArmorModifier } = armorUpdates

    return (
        <div className='armor-workspace-shell'>
            <h3>Armor Workspace</h3>
            {isEditing ?
                <input onChange={(event: any) => updateBasicArmorInfo('name', event.target.value)} value={name} />
                :
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Click to Toggle Whether Armor is Factored into Weapon Tables." className='workspace-button'>{name}</button>
            }
            <span>
                <strong>DR</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateBasicArmorInfo('dr', event.target.value)} value={dr} />
                    :
                    <p>{dr}</p>
                }
            </span>
            <span>
                <strong>Skill Adj</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateBasicArmorInfo('skillAdj', +event.target.value)} value={skillAdj} />
                    :
                    <p>{skillAdj}</p>
                }
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                {isEditing ?
                    <textarea onChange={(event: any) => updateBasicArmorInfo('bonus', event.target.value)} value={bonus} />
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
                                    <input onChange={(event: any) => updateArmorModifier('def', 'base', +event.target.value)} defaultValue={def.base ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateArmorModifier('fat', 'base', +event.target.value)} defaultValue={fat.base ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateArmorModifier('rec', 'base', +event.target.value)} defaultValue={rec.base ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateArmorModifier('init', 'base', +event.target.value)} defaultValue={init.base ?? undefined} />
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
                                    <input onChange={(event: any) => updateArmorModifier('def', 'skill', +event.target.value)} defaultValue={def.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateArmorModifier('fat', 'skill', +event.target.value)} defaultValue={fat.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateArmorModifier('rec', 'skill', +event.target.value)} defaultValue={rec.skill ?? undefined} />
                                </td>
                                <td>
                                    <input onChange={(event: any) => updateArmorModifier('init', 'skill', +event.target.value)} defaultValue={init.skill ?? undefined} />
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
                            <input onChange={(event: any) => updateArmorModifier('def', 'misc', +event.target.value)} defaultValue={def.misc ?? undefined} />
                        </td>
                        <td>
                            <input onChange={(event: any) => updateArmorModifier('fat', 'misc', +event.target.value)} defaultValue={fat.misc ?? undefined} />
                        </td>
                        <td>
                            <input onChange={(event: any) => updateArmorModifier('rec', 'misc', +event.target.value)} defaultValue={rec.misc ?? undefined} />
                        </td>
                        <td>
                            <input onChange={(event: any) => updateArmorModifier('init', 'misc', +event.target.value)} defaultValue={init.misc ?? undefined} />
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