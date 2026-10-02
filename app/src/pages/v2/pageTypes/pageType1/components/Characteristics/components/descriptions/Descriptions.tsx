import { Description } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Descriptions.css'
import { FocusEvent, Fragment, useContext, useState } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'
import makeTempID from '../../../../../../../../utilities/makeTempId'

interface Props {
    descriptions: Description[]
    pageID: number
    updates: PageType1Updates
}

const emptyDraft: Pick<Description, 'label' | 'attackEmotion' | 'defenseEmotion' | 'rank'> = {
    label: '',
    attackEmotion: '',
    defenseEmotion: '',
    rank: ''
}

function rankFromInput(event: FocusEvent<HTMLInputElement>): Description['rank'] {
    const raw = event.target.value
    if (raw === '') {
        return ''
    }
    return +raw
}

function hasContent(row: Pick<Description, 'label' | 'attackEmotion' | 'defenseEmotion' | 'rank'>) {
    return row.label !== '' || row.attackEmotion !== '' || row.defenseEmotion !== '' || row.rank !== ''
}

export default function DescriptionsDisplay({ descriptions, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = descriptions ?? []
    const max = 7
    const leftOver = max - rows.length - (isEditing ? 1 : 0)
    const showEditInputs = isEditing && leftOver > -1

    const [draft, setDraft] = useState(emptyDraft)
    const [insertReset, setInsertReset] = useState(0)

    function handleBlur(field: keyof typeof emptyDraft, event: FocusEvent<HTMLInputElement>) {
        const next = {
            ...draft,
            [field]: field === 'rank' ? rankFromInput(event) : event.target.value
        }
        if (hasContent(next)) {
            updates.insertDescription(pageID, { key: makeTempID(), ...next })
            setDraft(emptyDraft)
            setInsertReset(count => count + 1)
        } else {
            setDraft(next)
        }
    }

    return (
        <div className='descriptions-v2'>
            <div className="descriptions-header">
                <h2>Descriptions</h2>
                <h2 className="minor-heading">Attack</h2>
                <h2 className="minor-heading">Defense</h2>
                <h2 className="minor-heading">Rank</h2>
            </div>
            {rows.map((item, index) => (
                <Fragment key={item.key ?? item.id ?? index}>
                    <span>
                        {isEditing ?
                            <input
                                className="character-value"
                                placeholder=" "
                                value={item.label}
                                onChange={event => updates.updateDescription(pageID, index, { ...item, label: event.target.value })}
                            />
                            :
                            <p className="character-value">{item.label}</p>
                        }
                        {isEditing ?
                            <input
                                className="character-value"
                                placeholder=" "
                                maxLength={25}
                                value={item.attackEmotion}
                                onChange={event => updates.updateDescription(pageID, index, { ...item, attackEmotion: event.target.value })}
                            />
                            :
                            <p className="character-value">{item.attackEmotion}</p>
                        }
                        {isEditing ?
                            <input
                                className="character-value"
                                placeholder=" "
                                maxLength={25}
                                value={item.defenseEmotion}
                                onChange={event => updates.updateDescription(pageID, index, { ...item, defenseEmotion: event.target.value })}
                            />
                            :
                            <p className="character-value">{item.defenseEmotion}</p>
                        }
                        {isEditing ?
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={item.rank}
                                onChange={event => updates.updateDescription(pageID, index, {
                                    ...item,
                                    rank: event.target.value === '' ? '' : +event.target.value
                                })}
                            />
                            :
                            <p className="character-value">{item.rank}</p>
                        }
                    </span>
                </Fragment>
            ))}
            {showEditInputs && (
                <Fragment key={insertReset}>
                    <span>
                        <input className="character-value" placeholder=" " onBlur={event => handleBlur('label', event)} />
                        <input className="character-value" placeholder=" " maxLength={25} onBlur={event => handleBlur('attackEmotion', event)} />
                        <input className="character-value" placeholder=" " maxLength={25} onBlur={event => handleBlur('defenseEmotion', event)} />
                        <input className="character-value" type="number" placeholder=" " onBlur={event => handleBlur('rank', event)} />
                    </span>
                </Fragment>
            )}
            {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => (
                <Fragment key={`leftover-${index}`}>
                    <span>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                </Fragment>
            ))}
        </div>
    )
}
