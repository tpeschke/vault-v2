import './Defenses.css'
import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo"

interface Props {
    defenses: Defense
}

export default function DefensesDisplay({ defenses }: Props) {
    const { initiative, defense, parry, flanks, cover, parryDR, dr, notes } = defenses

    return (
        <div className="defenses-v2">
            <div className="defenses-header">
                <span>
                    <h1>Defenses</h1>
                    <h2></h2>
                </span>
                <span>
                    <em>Initiative</em>
                    <p className="center-text character-value">{initiative}</p>
                </span>
            </div>
            <div className="def-row">
                <em>Def (Parry / Flanks)</em>
                <p className="center-text character-value">{defense}</p>
                <span>(</span>
                <p className="center-text character-value">{parry}</p>
                <span>/</span>
                <p className="center-text character-value">{flanks}</p>
                <span>)</span>
            </div>
            <div className="cover-row">
                <span>
                    <em>Cover</em>
                    <p className="character-value">{cover}</p>
                </span>
                <span>
                    <em>P. DR</em>
                    <p className="character-value">{parryDR}</p>
                </span>
                <span>
                    <em>DR</em>
                    <p className="character-value">{dr}</p>
                </span>
            </div>
            <p className="character-value">{notes ?? ''}</p>
        </div>
    )
}
