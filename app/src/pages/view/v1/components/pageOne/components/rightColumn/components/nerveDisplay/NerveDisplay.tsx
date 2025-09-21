import { NerveAndVitalityInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './NerveDisplay.css'
import { useEffect, useState } from 'react'

interface Props {
    nerveAndVitalityInfo: NerveAndVitalityInfo
}

export default function NerveDisplay({ nerveAndVitalityInfo }: Props) {
    const { nerve, fatigue, stress, relaxation } = nerveAndVitalityInfo

    const [unsure, setUnsure] = useState(0)
    const [tense, setTense] = useState(0)
    const [shaken, setShaken] = useState(0)

    useEffect(() => {
        setUnsure(Math.ceil(nerve * .25))
        setTense(Math.floor(nerve * .5))
        setShaken(Math.ceil(nerve * .75))
    }, [nerve])

    const [leftPosition, setLeftPosition] = useState(243)

    useEffect(() => {
        setLeftPosition(getLeftPosition(fatigue))
    }, [fatigue])

    function getLeftPosition(fatigue: number): number {
        if (fatigue === 0) {
            return 243
        } else if (fatigue === 1) {
            return 158
        } else if (fatigue === 2) {
            return 78
        } else if (fatigue === 3) {
            return -2
        } else {
            return 243
        }
    }

    function placeholderFunction() {

    }

    return (
        <div className='nerve-display-shell'>
            <div>
                <h2>Nerve</h2>
                <div className='nerve-categories-shell'>
                    <div className='circle' style={{ left: `${leftPosition}px` }}></div>
                    <span>
                        <strong>U</strong>
                        <p>1 - {unsure}</p>
                    </span>
                    <span>
                        <strong>T</strong>
                        <p>{unsure + 1} - {tense}</p>
                    </span>
                    <span>
                        <strong>S</strong>
                        <p>{tense + 1} - {shaken}</p>
                    </span>
                    <span>
                        <strong>Br</strong>
                        <p>{shaken + 1} - {nerve}</p>
                    </span>
                </div>
                <div className='stress-n-relaxation-shell'>
                    <span>
                        <strong>Stress</strong>
                        <input onClick={placeholderFunction} value={stress} />
                    </span>
                    <span>
                        <strong>Relaxation</strong>
                        <input onClick={placeholderFunction} value={relaxation} />
                    </span>
                </div>
            </div>
        </div>
    )
}
