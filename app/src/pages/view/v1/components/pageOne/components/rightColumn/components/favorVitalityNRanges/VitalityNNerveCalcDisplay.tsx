import { VitalityNNerveCalcInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'

interface Props {
    vitalityNNerveCalcInfo: VitalityNNerveCalcInfo
}

export default function VitalityNNerveCalcDisplay({ vitalityNNerveCalcInfo }: Props) {
    const isEditing = useContext(EditingContext)
    
    const { vitalityDie, minVitality, nerveDie, minNerve } = vitalityNNerveCalcInfo

    return (
        <div className='v-n-n-calc-display-shell'>
            <span>
                <strong>Vitality Die</strong>
                {isEditing ?
                    <input value={vitalityDie} />
                    :
                    <p>{vitalityDie}</p>
                }
            </span>
            <span>
                <strong>Min Vitality</strong>
                {isEditing ?
                    <input value={minVitality} />
                    :
                    <p>{minVitality}</p>
                }
            </span>
            <span>
                <strong>Nerve Die</strong>
                {isEditing ?
                    <input value={nerveDie} />
                    :
                    <p>{nerveDie}</p>
                }
            </span>
            <span>
                <strong>Min Nerve</strong>
                {isEditing ?
                    <input value={minNerve} />
                    :
                    <p>{minNerve}</p>
                }
            </span>
        </div>
    )
}
