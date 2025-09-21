import { ShieldInfo } from '@vault/common/interfaces/v1/pageTwo/shieldInterfaces'
import './ShieldWorkspace.css'

interface Props {
    shieldInfo: ShieldInfo
}

export default function ShieldWorkspace({ shieldInfo }: Props) {
    const {name, dr, size, cover, flanks, bonus, modifiers} = shieldInfo

    const { def, fat, pry, brk } = modifiers

    function placeholderFunction() {

    }

    return (
        <div className='shield-workspace-shell'>
            <h3>Shield Workspace</h3>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Click to Toggle Whether Shield is Factored into Weapon Tables." className='workspace-button'>{name}</button>
            <span>
                <strong>DR</strong>
                <p>{dr}</p>
            </span>
            <span>
                <strong>Size</strong>
                <p>{size}</p>
            </span>
            <span>
                <strong>Flanks</strong>
                <p>{flanks}</p>
            </span>
            <span>
                <strong>Cover</strong>
                <p>{cover}</p>
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                <p>{bonus}</p>
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
                        <td>{def.base}</td>
                        <td>{fat.base}</td>
                        <td>{pry.base}</td>
                        <td>{brk.base}</td>
                        <td><strong>Base</strong></td>
                    </tr>
                    <tr>
                        {/* Cannot modifier Def via Skill */}
                        <td> </td>
                        <td>{fat.skill}</td>
                        <td>{pry.skill}</td>
                        <td>{brk.skill}</td>
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