import './Attacks.css'
import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo"

interface Props {
    attacks: AttacksArray
}

export default function AttacksDisplay({ attacks }: Props) {
    return (
        <div className="attacks-v2">
            <h1>Attacks</h1>
            {attacks.map(({ index, name, measure, attack, damage, type, recovery }) => (
                <div key={index} className="attack-block">
                    <h2>{name}</h2>
                    <div className="attack-row">
                        <span>
                            <em>Meas/RI</em>
                            <p className="center-text">{measure}</p>
                        </span>
                        <span>
                            <em>Atk</em>
                            <p className="center-text">{attack}</p>
                        </span>
                        <span>
                            <em>Damage</em>
                            <p>{damage}</p>
                        </span>
                    </div>
                    <div className="attack-row">
                        <span>
                            <em>Type</em>
                            <p>{type}</p>
                        </span>
                        <span>
                            <em>Rec</em>
                            <p className="center-text">{recovery}</p>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
