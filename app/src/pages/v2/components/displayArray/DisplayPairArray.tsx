import { FocusEvent, Fragment, ReactNode, useContext, useState } from 'react'
import EditingContext from '../../contexts/EditingContext'
import makeTempID from '../../../../utilities/makeTempId'

export interface PairItem {
    id?: number
    key?: string
    value: string
    rank: string | number
}

interface Props {
    max: number
    items: PairItem[]
    insert: (row: { key: string, value: string, rank: string | number }) => void
    update: (index: number, next: PairItem) => void
    renderRow: (item: PairItem, index: number, onChange: (next: PairItem) => void) => ReactNode
    renderInsert: (
        onBlurValue: (event: FocusEvent<HTMLInputElement>) => void,
        onBlurRank: (event: FocusEvent<HTMLInputElement>) => void
    ) => ReactNode
    renderLeftover: (index: number) => ReactNode
}

function rankFromInput(event: FocusEvent<HTMLInputElement>): string | number {
    const raw = event.target.value
    if (raw === '') {
        return ''
    }
    if (event.target.type === 'number') {
        return +raw
    }
    return raw
}

export default function DisplayPairArray({ max, items, insert, update, renderRow, renderInsert, renderLeftover }: Props) {
    const isEditing = useContext(EditingContext)

    const leftOver = max - items.length - (isEditing ? 1 : 0)
    const showEditInputs = isEditing && leftOver > -1

    const [draft, setDraft] = useState<{ value: string, rank: string | number }>({ value: '', rank: '' })
    const [insertReset, setInsertReset] = useState(0)

    function handleBlur(field: 'value' | 'rank', event: FocusEvent<HTMLInputElement>) {
        const next = {
            value: field === 'value' ? event.target.value : draft.value,
            rank: field === 'rank' ? rankFromInput(event) : draft.rank
        }
        const isValid = next.value !== '' || next.rank !== ''
        if (isValid) {
            insert({ key: makeTempID(), ...next })
            event.target.value = ''
            setDraft({ value: '', rank: '' })
            setInsertReset(count => count + 1)
        } else {
            setDraft(next)
        }
    }

    return (
        <>
            {items.map((item, index) => (
                <Fragment key={item.key ?? item.id ?? index}>
                    {renderRow(item, index, next => update(index, next))}
                </Fragment>
            ))}
            {showEditInputs && (
                <Fragment key={insertReset}>
                    {renderInsert(
                        event => handleBlur('value', event),
                        event => handleBlur('rank', event)
                    )}
                </Fragment>
            )}
            {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => (
                <Fragment key={`leftover-${index}`}>
                    {renderLeftover(index)}
                </Fragment>
            ))}
        </>
    )
}
