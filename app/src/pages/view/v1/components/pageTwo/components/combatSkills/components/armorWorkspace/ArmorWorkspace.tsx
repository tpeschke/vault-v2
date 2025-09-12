import './ArmorWorkspace.css'

interface Props {

}

export default function ArmorWorkspace({ }: Props) {
    const armorModifiers = {
        def: {
            base: -3,
            skill: 4,
            misc: 0,
            total: 1
        },
        fat: {
            base: -2,
            skill: 4,
            misc: undefined,
            total: 2
        },
        rcv: {
            base: 3,
            skill: 4,
            misc: 0,
            total: 7
        },
        init: {
            base: 2,
            skill: 4,
            misc: undefined,
            total: 6
        }
    }

    const { def, fat, rcv, init } = armorModifiers

    return (
        <div className='armor-workspace-shell'>
            <h3>Armor Workspace</h3>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Click to Toggle Whether Armor is Factored into Weapon Tables." className='workspace-button'>Coat of Plates</button>
            <span>
                <strong>DR</strong>
                <p>5</p>
            </span>
            <span>
                <strong>Skill Adj</strong>
                <p>-4</p>
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                <p>This armor definitely has a bonus</p>
            </span>
            <table>
                <thead>
                    <tr>
                        <th>Def</th>
                        <th>Fat</th>
                        <th>Rcv</th>
                        <th>Init</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{def.base}</td>
                        <td>{fat.base}</td>
                        <td>{rcv.base}</td>
                        <td>{init.base}</td>
                        <td><strong>Base</strong></td>
                    </tr>
                    <tr>
                        <td>{def.skill}</td>
                        <td>{fat.skill}</td>
                        <td>{rcv.skill}</td>
                        <td>{init.skill}</td>
                        <td><strong>Skill</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <input value={def.misc ?? undefined} />
                        </td>
                        <td>
                            <input value={fat.misc ?? undefined} />
                        </td>
                        <td>
                            <input value={rcv.misc ?? undefined} />
                        </td>
                        <td>
                            <input value={init.misc ?? undefined} />
                        </td>
                        <td><strong>Misc</strong></td>
                    </tr>
                    <tr className='total-row'>
                        <td>{def.total}</td>
                        <td>{fat.total}</td>
                        <td>{rcv.total}</td>
                        <td>{init.total}</td>
                        <td><strong>Total</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}