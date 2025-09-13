import './WeaponWorkspace.css'

interface Props {

}

export default function WeaponWorkspace({ }: Props) {
    const weaponModifiers = {
        atk: {
            skill: 4,
            misc: 0,
            total: 1
        },
        rcv: {
            skill: 4,
            misc: 0,
            total: 1
        },
        pry: {
            skill: 4,
            misc: undefined,
            total: 2
        },
        dam: {
            skill: 4,
            misc: undefined,
            total: 2
        }
    }

    const { atk, rcv, pry, dam } = weaponModifiers

    function placeholderFunction() {

    }

    return (
        <div className='weapon-workspace-shell workspace'>
            <p>Longsword</p>
            <span>
                <strong>Damage</strong>
                <p>3d3!+d4!</p>
            </span>
            <span>
                <span>
                    <strong>Rec</strong>
                    <p>14</p>
                </span>
                <span>
                    <strong>Size</strong>
                    <p>M</p>
                </span>
            </span>
            <span>
                <span>
                    <strong>Meas</strong>
                    <p>3.75</p>
                </span>
                <span>
                    <strong>Parry</strong>
                    <p>8</p>
                </span>
            </span>
            <span>
                <strong>Type</strong>
                <p>S</p>
            </span>
            <span className='bonus-shell'>
                <strong>Bonus</strong>
                <p>This shield definitely has a bonus</p>
            </span>
            <span className='bonus-shell trait-shell'>
                <strong>Traits</strong>
                <p>This shield definitely has a bonus</p>
            </span>
            <table>
                <thead>
                    <tr>
                        <th>Atk</th>
                        <th>Rcv</th>
                        <th>Pry</th>
                        <th>Dam</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{atk.skill}</td>
                        <td>{rcv.skill}</td>
                        <td>{pry.skill}</td>
                        <td>{dam.skill}</td>
                        <td><strong>Skill</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={atk.misc ?? undefined} />
                        </td>
                        <td>
                            <input onClick={placeholderFunction} defaultValue={rcv.misc ?? undefined} />
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
                        <td>{rcv.total}</td>
                        <td>{pry.total}</td>
                        <td>{dam.total}</td>
                        <td><strong>Total</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}