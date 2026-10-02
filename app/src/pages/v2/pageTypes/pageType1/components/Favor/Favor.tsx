import './Favor.css'
import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    favor: Favor
    pageID: number
    updates: PageType1Updates
}

export default function FavorDisplay({ favor, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { anointed, current, max } = favor

    return (
        <div className="favor-v2">
            <h1>Favor</h1>
            <div className="favor-body">
                <em className="favor-prompt">What is your relationship to the Divine?</em>
                <div className="favor-track">
                    {isEditing ?
                        <input className="center-text character-value" type="number" value={current} onChange={event => updates.updateFavor(pageID, { current: +event.target.value })} />
                        :
                        <p className="center-text character-value">{current}</p>
                    }
                    <span>/</span>
                    {isEditing ?
                        <input className="center-text character-value" type="number" value={max} onChange={event => updates.updateFavor(pageID, { max: +event.target.value })} />
                        :
                        <p className="center-text character-value">{max}</p>
                    }
                    <span className="anointed-row">
                        <em>Anointed?</em>
                        <span
                            className={anointed ? 'anointed-box checked' : 'anointed-box'}
                            onClick={isEditing ? () => updates.updateFavor(pageID, { anointed: !anointed }) : undefined}
                        ></span>
                    </span>
                </div>
            </div>
        </div>
    )
}
