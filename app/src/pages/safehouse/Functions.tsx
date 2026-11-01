import './Functions.css'
import { FocusEvent, useContext, useState } from 'react'
import { SAFEHOUSE_SECTION_CAPS, SafehouseFunctionRow, SafehouseNumber, SafehouseSection } from '@vault/common/interfaces/safehouse/safehouse'
import BlankContext, { blankInk } from '../v2/contexts/BlankContext'
import makeTempID from '../../utilities/makeTempId'

interface Props {
    section: SafehouseSection,
    label: string,
    rows: SafehouseFunctionRow[],
    onCommit: (index: number, next: SafehouseFunctionRow) => void,
    onInsert: (row: SafehouseFunctionRow) => void,
    onBlurCell: (row: SafehouseFunctionRow, field: 'name' | 'rank' | 'space' | 'notes') => void,
    onToggleR: (index: number, row: SafehouseFunctionRow) => void
}

const emptyDraft = {
    name: '',
    rank: '' as SafehouseNumber,
    r: false,
    space: '' as SafehouseNumber,
    notes: ''
}

function numberFromInput(raw: string): SafehouseNumber {
    if (raw === '') {
        return ''
    }
    const value = Number(raw)
    return Number.isFinite(value) ? value : ''
}

function hasContent(row: typeof emptyDraft) {
    return row.name !== '' || row.rank !== '' || row.space !== '' || row.notes !== '' || row.r
}

export default function Functions({ section, label, rows, onCommit, onInsert, onBlurCell, onToggleR }: Props) {
    const isBlank = useContext(BlankContext)
    const cap = SAFEHOUSE_SECTION_CAPS[section]
    const showInsert = rows.length < cap
    const leftover = cap - rows.length - (showInsert ? 1 : 0)
    const [draft, setDraft] = useState(emptyDraft)

    function commitDraft(next: typeof emptyDraft) {
        if (hasContent(next)) {
            onInsert({ id: 0, key: makeTempID(), ...next })
            setDraft(emptyDraft)
            return
        }
        setDraft(next)
    }

    function blurDraft(field: 'name' | 'rank' | 'space' | 'notes', event: FocusEvent<HTMLInputElement>) {
        const next = {
            ...draft,
            [field]: field === 'name' || field === 'notes' ? event.target.value : numberFromInput(event.target.value)
        }
        commitDraft(next)
    }

    return (
        <div className="safehouse-functions">
            <div className="safehouse-section-headers">
                <h2>{label}</h2>
                <h2>Rank</h2>
                <h2>R?</h2>
                <h2>Space</h2>
                <h2>Notes</h2>
            </div>
            <div className="safehouse-function-list">
                {rows.map((row, index) => (
                    <span className="safehouse-function-row" key={row.key ?? row.id ?? index}>
                        <input
                            className="character-value"
                            placeholder=" "
                            maxLength={500}
                            readOnly={isBlank}
                            value={blankInk(isBlank, row.name)}
                            onChange={event => onCommit(index, { ...row, name: event.target.value })}
                            onBlur={() => onBlurCell(row, 'name')}
                        />
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            readOnly={isBlank}
                            value={blankInk(isBlank, row.rank)}
                            onChange={event => onCommit(index, { ...row, rank: numberFromInput(event.target.value) })}
                            onBlur={() => onBlurCell(row, 'rank')}
                        />
                        <span className="safehouse-flag-cell">
                            <span
                                className={`safehouse-flag-box${row.r && !isBlank ? ' checked' : ''}`}
                                onClick={() => {
                                    if (isBlank) {
                                        return
                                    }
                                    onToggleR(index, row)
                                }}
                            >
                                {row.r && !isBlank && <i className="fa-solid fa-check"></i>}
                            </span>
                        </span>
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            readOnly={isBlank}
                            value={blankInk(isBlank, row.space)}
                            onChange={event => onCommit(index, { ...row, space: numberFromInput(event.target.value) })}
                            onBlur={() => onBlurCell(row, 'space')}
                        />
                        <input
                            className="character-value"
                            placeholder=" "
                            maxLength={500}
                            readOnly={isBlank}
                            value={blankInk(isBlank, row.notes)}
                            onChange={event => onCommit(index, { ...row, notes: event.target.value })}
                            onBlur={() => onBlurCell(row, 'notes')}
                        />
                    </span>
                ))}
                {showInsert && (
                    <span className="safehouse-function-row">
                        <input
                            className="character-value"
                            placeholder=" "
                            maxLength={500}
                            readOnly={isBlank}
                            value={draft.name}
                            onChange={event => setDraft({ ...draft, name: event.target.value })}
                            onBlur={event => blurDraft('name', event)}
                        />
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            readOnly={isBlank}
                            value={draft.rank}
                            onChange={event => setDraft({ ...draft, rank: numberFromInput(event.target.value) })}
                            onBlur={event => blurDraft('rank', event)}
                        />
                        <span className="safehouse-flag-cell">
                            <span
                                className={`safehouse-flag-box${draft.r && !isBlank ? ' checked' : ''}`}
                                onClick={() => {
                                    if (isBlank) {
                                        return
                                    }
                                    commitDraft({ ...draft, r: !draft.r })
                                }}
                            >
                                {draft.r && !isBlank && <i className="fa-solid fa-check"></i>}
                            </span>
                        </span>
                        <input
                            className="character-value"
                            type="number"
                            placeholder=" "
                            readOnly={isBlank}
                            value={draft.space}
                            onChange={event => setDraft({ ...draft, space: numberFromInput(event.target.value) })}
                            onBlur={event => blurDraft('space', event)}
                        />
                        <input
                            className="character-value"
                            placeholder=" "
                            maxLength={500}
                            readOnly={isBlank}
                            value={draft.notes}
                            onChange={event => setDraft({ ...draft, notes: event.target.value })}
                            onBlur={event => blurDraft('notes', event)}
                        />
                    </span>
                )}
                {leftover > 0 && [...Array(leftover).keys()].map(index => (
                    <span className="safehouse-function-row" key={`leftover-${index}`}>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                ))}
            </div>
        </div>
    )
}
