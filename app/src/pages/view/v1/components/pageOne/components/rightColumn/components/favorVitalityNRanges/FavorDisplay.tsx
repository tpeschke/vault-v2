import { FavorInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { UpdateFavorInfoFunction } from '../../../../../../hooks/interfaces/UpdateRightColumnInterfaces'

interface Props {
    favorInfo: FavorInfo,
    updateFavorInfo: UpdateFavorInfoFunction
}

export default function FavorDisplay({ favorInfo, updateFavorInfo }: Props) {
    const isEditing = useContext(EditingContext)    
    const { favor, maxFavor, anointed } = favorInfo

    return (
        <div className='favor-display-shell'>
            <span>
                <h3>Favor</h3>
                <input onChange={(event: any) => updateFavorInfo('favor', +event.target.value)} value={favor} />
            </span>
            <span>
                <strong>Max</strong>
                {isEditing ?
                    <input onChange={(event: any) => updateFavorInfo('maxFavor', +event.target.value)} value={maxFavor} />
                    :
                    <p>{maxFavor}</p>
                }
            </span>
            <span>
                <strong>Anointed?</strong>
                {anointed ?
                    <i onClick={_ => updateFavorInfo('anointed', false)} className="fa-solid fa-check"></i>
                    :
                    <i onClick={_ => updateFavorInfo('anointed', true)} className="fa-solid fa-x"></i>
                }
            </span>
        </div>
    )
}
