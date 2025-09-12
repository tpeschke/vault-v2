import './ShieldWorkspace.css'

interface Props {

}

export default function ShieldWorkspace({ }: Props) {
    const shieldModifiers = {
        def: {
            base: -3,
            skill: 4,
            misc: 0,
            total: 1
        },
        fat: {
            base: -3,
            skill: 4,
            misc: 0,
            total: 1
        },
        pry: {
            base: -2,
            skill: 4,
            misc: undefined,
            total: 2
        },
        brk: {
            base: -2,
            skill: 4,
            misc: undefined,
            total: 2
        }
    }

    const { def, fat, pry, brk } = shieldModifiers

    function placeholderFunction() {

    }

    return (
        <div className='shield-workspace-shell'>
            <h3>Shield Workspace</h3>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Click to Toggle Whether Shield is Factored into Weapon Tables." className='workspace-button'>Hoplon</button>
            <span>
                <strong>DR</strong>
                <p>5 +6/d</p>
            </span>
            <span>
                <strong>Size</strong>
                <p>M</p>
            </span>
            <span>
                <strong>Cover</strong>
                <p>+5 (+15)</p>
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                <p>This shield definitely has a bonus</p>
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
                        <td>{def.skill}</td>
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