import './Relationships.css'
import { FocusEvent, Fragment, useContext, useState } from 'react'
import { Page3Relationship } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import EditingContext from '../../../../contexts/EditingContext'
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import { PAGE3_RELATIONSHIP_CAP } from '../../../../hooks/updates/pageType3Updates'
import makeTempID from '../../../../../../utilities/makeTempId'

interface Props {
    relationships: Page3Relationship[]
    pageID: number
    updates: PageType3Updates
}

const emptyDraft = { value: '', r: '' as SkillNumber, p: '' as SkillNumber }

function numberFromInput(raw: string): SkillNumber {
    return raw === '' ? '' : +raw
}

function hasContent(row: { value: string, r: SkillNumber, p: SkillNumber }) {
    return row.value !== '' || row.r !== '' || row.p !== ''
}

export default function Relationships({ relationships, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = relationships ?? []
    const leftover = PAGE3_RELATIONSHIP_CAP - rows.length - (isEditing ? 1 : 0)
    const showInsert = isEditing && leftover > -1
    const [draft, setDraft] = useState(emptyDraft)
    const [insertReset, setInsertReset] = useState(0)

    function handleInsertBlur(field: keyof typeof emptyDraft, event: FocusEvent<HTMLInputElement>) {
        const next = {
            ...draft,
            [field]: field === 'value' ? event.target.value : numberFromInput(event.target.value)
        }
        if (hasContent(next)) {
            updates.insertRelationship(pageID, { key: makeTempID(), ...next })
            setDraft(emptyDraft)
            setInsertReset(count => count + 1)
        } else {
            setDraft(next)
        }
    }

    return (
        <div className="page3-relationships">
            <div className="page3-relationships-headers">
                <h1>Relationships</h1>
                <h1>R</h1>
                <h1>P</h1>
            </div>
            <div className="page3-relationships-list">
                {rows.map((row, index) => (
                    <span key={row.key ?? row.id ?? index}>
                        {isEditing
                            ? <input
                                className="character-value"
                                placeholder=" "
                                value={row.value}
                                onChange={event => updates.updateRelationship(pageID, index, { ...row, value: event.target.value })}
                            />
                            : <p className="character-value">{row.value}</p>
                        }
                        {isEditing
                            ? <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={row.r}
                                onChange={event => updates.updateRelationship(pageID, index, { ...row, r: numberFromInput(event.target.value) })}
                            />
                            : <p className="character-value">{row.r}</p>
                        }
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            value={row.p}
                            onChange={event => updates.updateRelationship(pageID, index, { ...row, p: numberFromInput(event.target.value) })}
                            onBlur={event => {
                                if (!row.id) { return }
                                updates.persistPage3RelationshipP(pageID, { id: row.id, p: numberFromInput(event.target.value) })
                            }}
                        />
                    </span>
                ))}
                {showInsert && (
                    <Fragment key={insertReset}>
                        <span>
                            <input
                                className="character-value"
                                placeholder=" "
                                defaultValue={draft.value}
                                onBlur={event => handleInsertBlur('value', event)}
                            />
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                defaultValue={draft.r}
                                onBlur={event => handleInsertBlur('r', event)}
                            />
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                defaultValue={draft.p}
                                onBlur={event => handleInsertBlur('p', event)}
                            />
                        </span>
                    </Fragment>
                )}
                {leftover > -1 && [...Array(leftover).keys()].map(index => (
                    <span key={`leftover-${index}`}>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                ))}
            </div>
        </div>
    )
}
