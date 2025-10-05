import { VitalityNNerveCalcInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { UpdateVitalityNNerveFunction } from '../../../../../../hooks/interfaces/pageOneInterfaces/UpdateRightColumnInterfaces'

interface Props {
    vitalityNNerveCalcInfo: VitalityNNerveCalcInfo,
    updateVitalityNNerve: UpdateVitalityNNerveFunction
}

export default function VitalityNNerveCalcDisplay({ vitalityNNerveCalcInfo, updateVitalityNNerve }: Props) {
    const isEditing = useContext(EditingContext)

    const { vitalityDie, minVitality, nerveDie, minNerve } = vitalityNNerveCalcInfo

    return (
        <div className='v-n-n-calc-display-shell'>
            <span>
                <strong>Vitality Die</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateVitalityNNerve('vitalityDie', event.target.value)} value={vitalityDie} />
                    :
                    <p>{vitalityDie}</p>
                }
            </span>
            <span>
                <strong>Min Vitality</strong>
                <p>{minVitality}</p>
            </span>
            <span>
                <strong>Nerve Die</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateVitalityNNerve('nerveDie', event.target.value)} value={nerveDie ? nerveDie : ''} />
                    :
                    <p>{nerveDie}</p>
                }
            </span>
            <span>
                <strong>Min Nerve</strong>
                <p>{minNerve}</p>
            </span>
        </div>
    )
}
