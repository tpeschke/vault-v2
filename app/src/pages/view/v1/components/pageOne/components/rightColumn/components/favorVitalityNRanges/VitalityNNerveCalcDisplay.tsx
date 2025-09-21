import { VitalityNNerveCalcInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'

interface Props {
    vitalityNNerveCalcInfo: VitalityNNerveCalcInfo
}

export default function VitalityNNerveCalcDisplay({ vitalityNNerveCalcInfo }: Props) {
    const { vitalityDie, minVitality, nerveDie, minNerve } = vitalityNNerveCalcInfo

    return (
        <div className='v-n-n-calc-display-shell'>
            <span>
                <strong>Vitality Die</strong>
                <p>{vitalityDie}</p>
            </span>
            <span>
                <strong>Min Vitality</strong>
                <p>{minVitality}</p>
            </span>
            <span>
                <strong>Nerve Die</strong>
                <p>{nerveDie}</p>
            </span>
            <span>
                <strong>Min Nerve</strong>
                <p>{minNerve}</p>
            </span>
        </div>
    )
}
