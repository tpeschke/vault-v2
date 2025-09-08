import './FavorVitalityNRanges.css'

interface Props {

}

export default function VitalityNNerveCalcDisplay({ }: Props) {
    return (
        <div className='v-n-n-calc-display-shell'>
            <span>
                <strong>Vitality Die</strong>
                <p>d4</p>
            </span>
            <span>
                <strong>Min Vitality</strong>
                <p>1</p>
            </span>
            <span>
                <strong>Nerve Die</strong>
                <p>d8</p>
            </span>
            <span>
                <strong>Min Nerve</strong>
                <p>2</p>
            </span>
        </div>
    )
}
