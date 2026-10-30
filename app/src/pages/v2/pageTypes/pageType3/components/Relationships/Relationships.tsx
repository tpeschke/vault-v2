import './Relationships.css'
import { FocusEvent, Fragment, useState } from 'react'
import { Page3Relationship } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
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

function isEmpty(row: { value: string, r: SkillNumber, p: SkillNumber }) {
    return row.value === '' && row.r === '' && row.p === ''
}

export default function Relationships({ relationships, pageID, updates }: Props) {
    const rows = relationships ?? []
    const showInsert = rows.length < PAGE3_RELATIONSHIP_CAP
    const leftover = PAGE3_RELATIONSHIP_CAP - rows.length - (showInsert ? 1 : 0)
    const [draft, setDraft] = useState(emptyDraft)
    const [insertReset, setInsertReset] = useState(0)

    function commitRow(index: number, row: Page3Relationship, next: Page3Relationship) {
        updates.updateRelationship(pageID, index, next)
        if (isEmpty(next) && row.id) {
            updates.persistPage3RelationshipDelete(pageID, { id: row.id })
        }
    }

    function handleInsertBlur(field: keyof typeof emptyDraft, event: FocusEvent<HTMLInputElement>) {
        const next = {
            ...draft,
            [field]: field === 'value' ? event.target.value : numberFromInput(event.target.value)
        }
        if (hasContent(next)) {
            const key = makeTempID()
            updates.insertRelationship(pageID, { key, ...next })
            updates.persistPage3RelationshipInsert(pageID, { key, ...next })
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
                <h1 className='minor-heading'>R</h1>
                <h1 className='minor-heading'>P</h1>
            </div>
            <div className="page3-relationships-list">
                {rows.map((row, index) => (
                    <span key={row.key ?? row.id ?? index}>
                        <input
                            className="character-value"
                            placeholder=" "
                            value={row.value}
                            onChange={event => commitRow(index, row, { ...row, value: event.target.value })}
                            onBlur={event => {
                                if (!row.id) { return }
                                updates.persistPage3RelationshipValue(pageID, { id: row.id, value: event.target.value })
                            }}
                        />
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            value={row.r}
                            onChange={event => commitRow(index, row, { ...row, r: numberFromInput(event.target.value) })}
                            onBlur={event => {
                                if (!row.id) { return }
                                updates.persistPage3RelationshipR(pageID, { id: row.id, r: numberFromInput(event.target.value) })
                            }}
                        />
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            value={row.p}
                            onChange={event => commitRow(index, row, { ...row, p: numberFromInput(event.target.value) })}
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
