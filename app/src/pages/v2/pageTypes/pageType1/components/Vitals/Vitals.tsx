import './Vitals.css'
import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"
import d4 from '../../../../../../assets/images/d4.png'
import d6 from '../../../../../../assets/images/d6.png'
import d8 from '../../../../../../assets/images/d8.png'
import d10 from '../../../../../../assets/images/d10.png'
import d12 from '../../../../../../assets/images/d12.png'
import d20 from '../../../../../../assets/images/d20.png'

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
                        <p className="center-text character-value">{selfDoubt.threshold}</p>
                    </span>
                    <span>
                        <h2>Die Penalty</h2>
                        <p className="center-text character-value">{selfDoubt.diePenalty}</p>
                    </span>
                </div>
            </section>
            <section>
                <h1>Damage</h1>
                <DieRow dieIndex={damage.dieIndex} />
                <div className="damage-values">
                    <span className='vitals-split'>
                        <h2>Trauma</h2>
                        <p className="center-text character-value">{damage.threshold * 2}</p>
                    </span>
                    <span className='vitals-split'>
                        <h2>Knock Back</h2>
                        <p className="center-text character-value">{damage.knockback}</p>
                    </span>
                    <p className="center-text character-value">{damage.damage}</p>
                    <span className="slash">/</span>
                    <p className="center-text character-value">{damage.threshold}</p>
                </div>
            </section>
            <section>
                <h1>Stress</h1>
                <DieRow dieIndex={stress.dieIndex} />
                <div className="stress-values">
                    <p className="center-text character-value">{stress.stress}</p>
                    <span className="slash">/</span>
                    <p className="center-text character-value">{stress.threshold}</p>
                </div>
            </section>
        </div>
    )
}

function DieRow({ dieIndex }: { dieIndex: number }) {
    const cellClass = (index: number) => dieIndex > 0 && (dieIndex - 1) === index ? 'selected center-text' : 'center-text'

    return (
        <div className="die-row">
            <h2>Die</h2>
            <p className={cellClass(0)}><img src={d4} alt="d4" /></p>
            <p className={cellClass(1)}><img src={d6} alt="d6" /></p>
            <p className={cellClass(2)}><img src={d8} alt="d8" /></p>
            <p className={cellClass(3)}><img src={d10} alt="d10" /></p>
            <p className={cellClass(4)}><img src={d12} alt="d12" /></p>
            <p className={cellClass(5)}><img src={d20} alt="d20" /></p>
        </div>
    )
}
