import './Attacks.css'
import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo"

interface Props {
    attacks: AttacksArray
}

export default function AttacksDisplay({ attacks }: Props) {
    return (
        <div className="attacks-v2">
            <h1>Attacks</h1>
            {attacks.map(({ index, name, measure, attack, damage, type, recovery, notes }) => {
                return (
                    <div key={index} className="attack-block">
                        <p className="border">{name}</p>
                        <div>
                            <span>
                                <em>Meas</em>
                                <p>{measure}</p>
                            </span>
                            <span>
                                <em>Atk</em>
                                <p>{attack}</p>
                            </span>
                            <span>
                                <em>Dmg</em>
                                <p>{damage}</p>
                            </span>
                            <span>
                                <em>Type</em>
                                <p>{type}</p>
                            </span>
                            <span>
                                <em>Rec</em>
                                <p>{recovery}</p>
                            </span>
                        </div>
                        <span className="notes-row">
                            <em>Notes</em>
                            <p>{notes}</p>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
