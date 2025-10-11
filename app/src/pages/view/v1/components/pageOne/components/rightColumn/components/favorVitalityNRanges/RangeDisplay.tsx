import { useContext, useEffect, useState } from 'react'
import './FavorVitalityNRanges.css'
import EditingContext from '../../../../../../contexts/EditingContext'
import { UpdateMaxRangeFunction } from '../../../../../../hooks/interfaces/pageOneInterfaces/UpdateRightColumnInterfaces'

interface Props {
    maxRange?: number,
    updateMaxRange: UpdateMaxRangeFunction
}

export default function RangeDisplay({ maxRange, updateMaxRange }: Props) {
    const isEditing = useContext(EditingContext)

    const penaltyArray = [0, -2, -4, -8, -16, -32]

    const [rangeIncrement, setRangeIncrement] = useState(1)

    useEffect(() => {
        if (maxRange) {
            setRangeIncrement(Math.ceil(maxRange / 6))
        }
    }, [maxRange])

    function RangeRow(penalty: number, lowEndValue: number, highEndValue: number) {
        return (
            <span key={penalty}>
                <strong>{penalty}</strong>
                <span>
                    <p>{lowEndValue}</p>
                    <p>-</p>
                    {isEditing && penalty === -32 ?
                        <input type='number' onChange={(event: any) => updateMaxRange(+event.target.value)} value={highEndValue} />
                        :
                        <p>{highEndValue}</p>
                    }
                </span>
            </span>
        )
    }

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