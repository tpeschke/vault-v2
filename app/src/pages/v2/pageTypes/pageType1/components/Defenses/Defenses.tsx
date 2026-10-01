import './Defenses.css'
import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo"

interface Props {
    defenses: Defense
}

export default function DefensesDisplay({ defenses }: Props) {
    const { name, initiative, defense, parry, flanks, cover, parryDR, dr, notes } = defenses

    return (
        <div className="defenses-v2">
            <h1>Defenses</h1>
            <p className="border">{name}</p>
            <div>
                <span>
                    <em>Init</em>
                    <p>{initiative}</p>
                </span>
                <span>
                    <em>Def</em>
                    <p>{defense}</p>
                </span>
                <span>
                    <em>Parry</em>
                    <p>{parry}</p>
                </span>
                <span>
                    <em>Flanks</em>
                    <p>{flanks}</p>
                </span>
            </div>
            <div>
                <span>
                    <em>Cover</em>
                    <p>{cover}</p>
                </span>
                <span>
                    <em>Parry DR</em>
                    <p>{parryDR}</p>
                </span>
                <span>
                    <em>DR</em>
                    <p>{dr}</p>
                </span>
            </div>
            <span className="notes-row">
                <em>Notes</em>
                <p>{notes}</p>
            </span>
        </div>
    )
}
