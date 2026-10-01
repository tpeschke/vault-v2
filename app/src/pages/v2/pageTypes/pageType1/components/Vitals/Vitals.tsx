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

            <h2>Self-Doubt</h2>
            <div className='vitals-row'>
                <span>
                    <strong>Die</strong>
                    <p>{selfDoubt.dieIndex}</p>
                </span>
                <span>
                    <strong>Threshold</strong>
                    <p>{selfDoubt.threshold}</p>
                </span>
                <span>
                    <strong>Die Penalty</strong>
                    <p>{selfDoubt.diePenalty}</p>
                </span>
            </div>

            <h2>Damage</h2>
            <div className='vitals-row'>
                <span>
                    <strong>Die</strong>
                    <p>{damage.dieIndex}</p>
                </span>
                <span>
                    <strong>Knockback</strong>
                    <p>{damage.knockback}</p>
                </span>
                <span>
                    <strong>Damage</strong>
                    <p>{damage.damage}</p>
                </span>
                <span>
                    <strong>Threshold</strong>
                    <p>{damage.threshold}</p>
                </span>
            </div>

            <h2>Stress</h2>
            <div className='vitals-row'>
                <span>
                    <strong>Die</strong>
                    <p>{stress.dieIndex}</p>
                </span>
                <span>
                    <strong>Stress</strong>
                    <p>{stress.stress}</p>
                </span>
                <span>
                    <strong>Threshold</strong>
                    <p>{stress.threshold}</p>
                </span>
            </div>
        </div>
    )
}
