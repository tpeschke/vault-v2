import { FavorInfo } from '@vault/common/interfaces/v1/pageOne/rightColumnInterfaces'
import './FavorVitalityNRanges.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { UpdateFavorInfoFunction } from '../../../../../../hooks/interfaces/pageOneInterfaces/UpdateRightColumnInterfaces'
import IsBlankContext from '../../../../../../contexts/IsBlankContext'

interface Props {
    favorInfo: FavorInfo,
    updateFavorInfo: UpdateFavorInfoFunction
}

export default function FavorDisplay({ favorInfo, updateFavorInfo }: Props) {
    const isBlank = useContext(IsBlankContext)
    const isEditing = useContext(EditingContext)

    if (!isBlank) {
        const { favor, maxFavor, anointed } = favorInfo

        return (
            <div className='favor-display-shell'>
                <span>
                    <h3>Favor</h3>
                    <input type='number' onChange={(event: any) => updateFavorInfo('favor', +event.target.value)} value={favor ? favor : ''} />
                </span>
                <span>
                    <strong>Max</strong>
                    {isEditing ?
                        <input type='number' onChange={(event: any) => updateFavorInfo('maxFavor', +event.target.value)} value={maxFavor} />
                        :
                        <p>{maxFavor}</p>
                    }
                </span>
                <span>
                    <strong>Anointed?</strong>
                    {anointed ?
                        <i onClick={_ => updateFavorInfo('anointed', 0)} className="fa-solid fa-check"></i>
                        :
                        <i onClick={_ => updateFavorInfo('anointed', 1)} className="fa-solid fa-x"></i>
                    }
                </span>
            </div>
        )
    }

    return (
        <div className='favor-display-shell'>
            <span>
                <h3>Favor</h3>
                <p> </p>
            </span>
            <span>
                <strong>Max</strong>
                <p> </p>
            </span>
            <span>
                <strong>Anointed?</strong>
                <p> </p>
            </span>
        </div>
    )
}
