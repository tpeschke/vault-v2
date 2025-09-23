import { NerveAndVitalityInfo, Wound } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './VitalityDisplay.css'
import { useContext, useEffect, useState } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'

interface Props {
    nerveAndVitalityInfo: NerveAndVitalityInfo
}

export default function VitalityDisplay({ nerveAndVitalityInfo }: Props) {
    const isEditing = useContext(EditingContext)

    const { vitality, fatigue, wounds, sizeMod } = nerveAndVitalityInfo

    const [hurt, setHurt] = useState(0)
    const [bloodied, setBloodied] = useState(0)
    const [wounded, setWounded] = useState(0)

    useEffect(() => {
        setHurt(Math.ceil(vitality * .25))
        setBloodied(Math.floor(vitality * .5))
        setWounded(Math.ceil(vitality * .75))
    }, [vitality])

    const [totalDamage, setTotalDamage] = useState(0)
    const [leftOver, setLeftOver] = useState(0)

    useEffect(() => {
        const totalDamage = wounds.reduce((total, wound) => {
            return total + wound.severity
        }, 0)

        setTotalDamage(totalDamage)

        setLeftOver(9 - wounds.length)
    }, [wounds])

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
        <div className='vitality-display-shell'>
            <div>
                <h2>Vitality</h2>
                <div className='vitality-categories-shell'>
                    <div className='circle' style={{ left: `${leftPosition}px` }}></div>
                    <span>
                        <strong>H</strong>
                        <p>1 - {hurt}</p>
                    </span>
                    <span>
                        <strong>B</strong>
                        <p>{hurt + 1} - {bloodied}</p>
                    </span>
                    <span>
                        <strong>W</strong>
                        <p>{bloodied + 1} - {wounded}</p>
                    </span>
                    <span>
                        <strong>C</strong>
                        <p>{wounded + 1} - {vitality}</p>
                    </span>
                </div>
                <div className='wounds-headings-shell'>
                    <span>
                        <strong>Total</strong>
                        <p>{totalDamage}</p>
                    </span>
                    <strong>Severity</strong>
                    <strong>Days to Heal</strong>
                    <span>
                        <strong>Trauma</strong>
                        <p>{hurt + 1}</p>
                    </span>
                    <strong>Severity</strong>
                    <strong>Days to Heal</strong>
                </div>
                <div className='wounds-shell'>
                    {wounds.map(woundRow)}
                    <span>
                        <strong>Wound</strong>
                        <input onClick={placeholderFunction} />
                        <input onClick={placeholderFunction} />
                    </span>
                    {[...Array(leftOver).keys()].map(nullWoundRow)}
                </div>
                <span className='size-mod'>
                    <strong>Size Mod</strong>
                    {isEditing ?
                        <input value={sizeMod} />
                        :
                        <p>{sizeMod}</p>
                    }
                </span>
            </div>
        </div>
    )
}

function woundRow({ severity, days }: Wound, index: number) {

    function placeholderFunction() {

    }

    return (
        <span key={index}>
            <strong>Wound</strong>
            <input onClick={placeholderFunction} defaultValue={severity} />
            <input onClick={placeholderFunction} defaultValue={days} />
        </span>
    )
}

function nullWoundRow(_: any, index: number) {
    return (
        <span key={index} className='null-wound-row'>
            <strong>Wound</strong>
            <p></p>
            <p></p>
        </span>
    )
}