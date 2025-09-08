import './FavorVitalityNRanges.css'

interface Props {

}

export default function FavorDisplay({ }: Props) {
    return (
        <div className='favor-display-shell'>
            <span>
                <h3>Favor</h3>
                <input />
            </span>
            <span>
                <strong>Max</strong>
                <p>3</p>
            </span>
            <span>
                <strong>Anointed?</strong>
                <i className="fa-solid fa-check"></i>
            </span>
        </div>
    )
}
