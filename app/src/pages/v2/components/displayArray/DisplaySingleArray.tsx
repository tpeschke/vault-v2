import { FocusEvent, Fragment, ReactNode, useContext } from 'react'
import EditingContext from '../../contexts/EditingContext'
import makeTempID from '../../../../utilities/makeTempId'

export interface SingleItem {
    id?: number
    key?: string
    value: string
}

interface Props {
    max: number
    items: SingleItem[]
    insert: (row: { key: string, value: string }) => void
    update: (index: number, next: SingleItem) => void
    renderRow: (item: SingleItem, index: number, onChange: (next: SingleItem) => void) => ReactNode
    renderInsert: (onBlur: (event: FocusEvent<HTMLInputElement>) => void) => ReactNode
    renderLeftover: (index: number) => ReactNode
}

export default function DisplaySingleArray({ max, items, insert, update, renderRow, renderInsert, renderLeftover }: Props) {
    const isEditing = useContext(EditingContext)

    const leftOver = max - items.length - (isEditing ? 1 : 0)
    const showEditInputs = isEditing && leftOver > -1

    function handleInsertBlur(event: FocusEvent<HTMLInputElement>) {
        const { value } = event.target
        if (value !== '') {
            insert({ key: makeTempID(), value })
            event.target.value = ''
        }
    }

    return (
        <>
            {items.map((item, index) => (
                <Fragment key={item.key ?? item.id ?? index}>
                    {renderRow(item, index, next => update(index, next))}
                </Fragment>
            ))}
            {showEditInputs && renderInsert(handleInsertBlur)}
            {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => (
                <Fragment key={`leftover-${index}`}>
                    {renderLeftover(index)}
                </Fragment>
            ))}
        </>
    )
}
