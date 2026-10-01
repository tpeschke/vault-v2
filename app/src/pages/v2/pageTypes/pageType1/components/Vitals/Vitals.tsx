import './Vitals.css'
import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"

interface Props {
    vitalsInfo: Vitals
}

export default function VitalsDisplay({ vitalsInfo }: Props) {
    const { selfDoubt, damage, stress } = vitalsInfo

    return (
        <div className="vitals-v2">
            <h1>Vitals</h1>

            <h2>Self Doubt</h2>
            <div>
                <span>
                    <em>Die</em>
                    <p>{selfDoubt.dieIndex}</p>
                </span>
                <span>
                    <em>Threshold</em>
                    <p>{selfDoubt.threshold}</p>
                </span>
                <span>
                    <em>Die Penalty</em>
                    <p>{selfDoubt.diePenalty}</p>
                </span>
            </div>

            <h2>Damage</h2>
            <div>
                <span>
                    <em>Die</em>
                    <p>{damage.dieIndex}</p>
                </span>
                <span>
                    <em>Knockback</em>
                    <p>{damage.knockback}</p>
                </span>
                <span>
                    <em>Damage</em>
                    <p>{damage.damage}</p>
                </span>
                <span>
                    <em>Threshold</em>
                    <p>{damage.threshold}</p>
                </span>
            </div>

            <h2>Stress</h2>
            <div>
                <span>
                    <em>Die</em>
                    <p>{stress.dieIndex}</p>
                </span>
                <span>
                    <em>Stress</em>
                    <p>{stress.stress}</p>
                </span>
                <span>
                    <em>Threshold</em>
                    <p>{stress.threshold}</p>
                </span>
            </div>
        </div>
    )
}
