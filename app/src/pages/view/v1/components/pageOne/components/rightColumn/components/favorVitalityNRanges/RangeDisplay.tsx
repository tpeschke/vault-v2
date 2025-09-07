import '../../RightColumn.css'

interface Props {

}

export default function RangeDisplay({ }: Props) {
    const maxRange = 180
    const rangeIncrement = maxRange / 6
    const penaltyArray = [0, -2, -4, -8, -16, -32]

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
        <span>
            <strong>{penalty}</strong>
            <span>
                <p>{lowEndValue}</p>
                <p>-</p>
                <p>{highEndValue}</p>
            </span>
        </span>
    )
}