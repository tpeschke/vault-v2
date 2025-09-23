import { FavorInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'

interface Props {
    favorInfo: FavorInfo
}

export default function FavorDisplay({ favorInfo }: Props) {
    const isEditing = useContext(EditingContext)
    
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
                {isEditing ?
                    <input value={maxFavor} />
                    :
                    <p>{maxFavor}</p>
                }
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
