import { useEffect, useState } from 'react'
import './FavorVitalityNRanges.css'

interface Props {
    maxRange: number
}

export default function RangeDisplay({ maxRange }: Props) {
    const penaltyArray = [0, -2, -4, -8, -16, -32]

    const [rangeIncrement, setRangeIncrement] = useState(1)

    useEffect(() => {
        setRangeIncrement(maxRange / 6)
    }, [maxRange])

    return (
        <div className='right ranged-display-shell'>
            <h3>Ranges</h3>
            {penaltyArray.map((penalty, index) => {
                const lowEndValue = index === 0 ? 5 : (rangeIncrement * (index)) + 1
                const highEndValue = rangeIncrement * (index + 1)
                return RangeRow(penalty, lowEndValue, highEndValue)
            })}
        </div>
    )
}

function RangeRow(penalty: number, lowEndValue: number, highEndValue: number) {
    return (
        <span key={penalty}>
            <strong>{penalty}</strong>
            <span>
                <p>{lowEndValue}</p>
                <p>-</p>
                <p>{highEndValue}</p>
            </span>
        </span>
    )
}