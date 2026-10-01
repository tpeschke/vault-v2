import './Vitals.css'
import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"

const DICE = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20']

interface Props {
    vitals: Vitals
}

export default function VitalsDisplay({ vitals }: Props) {
    const { selfDoubt, damage, stress } = vitals

    return (
        <div className="vitals-v2">
            <section>
                <h1>Self Doubt</h1>
                <DieRow dieIndex={selfDoubt.dieIndex} />
                <div className="vitals-split">
                    <span>
                        <h2>Integrity Threshold</h2>
                        <p className="center-text">{selfDoubt.threshold}</p>
                    </span>
                    <span>
                        <h2>Die Penalty</h2>
                        <p className="center-text">{selfDoubt.diePenalty}</p>
                    </span>
                </div>
            </section>
            <section>
                <h1>Damage</h1>
                <DieRow dieIndex={damage.dieIndex} />
                <div className="damage-values">
                    <em>Trauma</em>
                    <span>
                        <h2>Knock Back</h2>
                        <p className="center-text">{damage.knockback}</p>
                    </span>
                    <p className="center-text">{damage.damage}</p>
                    <span className="slash">/</span>
                    <p className="center-text">{damage.threshold}</p>
                </div>
            </section>
            <section>
                <h1>Stress</h1>
                <DieRow dieIndex={stress.dieIndex} />
                <div className="stress-values">
                    <p className="center-text">{stress.stress}</p>
                    <span className="slash">/</span>
                    <p className="center-text">{stress.threshold}</p>
                </div>
            </section>
        </div>
    )
}

function DieRow({ dieIndex }: { dieIndex: number }) {
    return (
        <div className="die-row">
            <h2>Die</h2>
            {DICE.map((die, index) => (
                <p key={die} className={dieIndex > 0 && (dieIndex - 1) === index ? 'selected center-text' : 'center-text'}>{die}</p>
            ))}
        </div>
    )
}
