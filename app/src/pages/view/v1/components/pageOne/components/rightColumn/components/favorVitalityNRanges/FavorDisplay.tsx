import { FavorInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'

interface Props {
    favorInfo: FavorInfo
}

export default function FavorDisplay({ favorInfo }: Props) {
    const { favor, maxFavor, anointed } = favorInfo

    function placeholderFunction() {

    }

    return (
        <div className='favor-display-shell'>
            <span>
                <h3>Favor</h3>
                <input onClick={placeholderFunction} value={favor} />
            </span>
            <span>
                <strong>Max</strong>
                <p>{maxFavor}</p>
            </span>
            <span>
                <strong>Anointed?</strong>
                {anointed ?
                    <i className="fa-solid fa-check"></i>
                    :
                    <i className="fa-solid fa-x"></i>
                }
            </span>
        </div>
    )
}
