import './Defenses.css'
import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo"

interface Props {
    defenses: Defense
}

export default function DefensesDisplay({ defenses }: Props) {
    const { initiative, defense, parry, flanks, cover, parryDR, dr } = defenses

    return (
        <div className="defenses-v2">
            <div className="defenses-header">
                <h1>Defenses</h1>
                <span>
                    <em>Initiative</em>
                    <p className="center-text">{initiative}</p>
                </span>
            </div>
            <div className="def-row">
                <em>Def (Parry / Flanks)</em>
                <p className="center-text">{defense}</p>
                <span>(</span>
                <p className="center-text">{parry}</p>
                <span>/</span>
                <p className="center-text">{flanks}</p>
                <span>)</span>
            </div>
            <div className="cover-row">
                <span>
                    <em>Cover</em>
                    <p>{cover}</p>
                </span>
                <span>
                    <em>P. DR</em>
                    <p>{parryDR}</p>
                </span>
                <span>
                    <em>DR</em>
                    <p>{dr}</p>
                </span>
            </div>
        </div>
    )
}
