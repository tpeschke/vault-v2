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
            <h2>{name}</h2>
            <div className='defenses-row'>
                <span>
                    <strong>Init</strong>
                    <p>{initiative}</p>
                </span>
                <span>
                    <strong>Def</strong>
                    <p>{defense}</p>
                </span>
                <span>
                    <strong>Parry</strong>
                    <p>{parry}</p>
                </span>
                <span>
                    <strong>Flanks</strong>
                    <p>{flanks}</p>
                </span>
            </div>
            <div className='defenses-row'>
                <span>
                    <strong>Cover</strong>
                    <p>{cover}</p>
                </span>
                <span>
                    <strong>Parry DR</strong>
                    <p>{parryDR}</p>
                </span>
                <span>
                    <strong>DR</strong>
                    <p>{dr}</p>
                </span>
            </div>
            <div className='defenses-notes'>
                <strong>Notes</strong>
                <p>{notes}</p>
            </div>
        </div>
    )
}
