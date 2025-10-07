import { PairObject } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import '../DisplayArray.css'
import { useContext, useState } from 'react'
import EditingContext from '../../../contexts/EditingContext'
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from '../../../hooks/interfaces/pageOneInterfaces/UpdateCharacteristicInterfaces'
import makeTempID from '../../../../../../utilities/makeTempId'

interface Props {
    max: number,
    arrayToDisplay: PairObject[],
    insertFunction?: InsertCharacteristicFunction,
    updateFunction?: UpdateCharacteristicFunction
}

export default function DisplayPairArray({ max, arrayToDisplay, insertFunction, updateFunction }: Props) {
    const isEditing = useContext(EditingContext)

    const leftOver = max - arrayToDisplay.length - (isEditing ? 1 : 0)

    function updateRow(index: number, object: PairObject, key: 'title' | 'value', value: string | number) {
        if (updateFunction) {
            updateFunction(index, {
                ...object,
                [key]: value
            })
        }
    }

    function formatIntoRow({ id, title, value, key }: PairObject, index: number) {
        if (isEditing) {
            return (
                <div key={id ?? key} className='display-pair'>
                    <input value={title ? title : ''} onChange={(event: any) => updateRow(index, { id, title, value }, 'title', event.target.value)} />
                    <input value={value} onChange={(event: any) => updateRow(index, { id, title, value }, 'value', event.target.value)} />
                </div>
            )
        }
        return (
            <div key={id ?? key} className='display-pair'>
                <p>- {title}</p>
                <p>{value}</p>
            </div>
        )
    }

    const [newObject, setNewObject] = useState<PairObject>({ title: '', value: '' })

    function insertRow(key: 'title' | 'value', event: any) {
        const { value } = event.target

        const tempObject: PairObject = {
            key: makeTempID(),
            ...newObject,
            [key]: key === 'title' ? value : +value
        }

        const isValidObject = tempObject.value !== '' || tempObject.title

        if (insertFunction && isValidObject) {
            insertFunction(tempObject)
            event.target.value = ''
            setNewObject({ title: '', value: '' })
        } else {
            setNewObject(tempObject)
        }
    }

    function formatNewInputRow() {
        return (
            <div className='display-pair'>
                <input onBlur={(event: any) => insertRow('title', event)} />
                <input onBlur={(event: any) => insertRow('value', event)} />
            </div>
        )
    }

    const showEditInputs = isEditing && leftOver > -1

    return (
        <div className="display-array-shell multi-item">
            {arrayToDisplay.map(formatIntoRow)}
            {showEditInputs && formatNewInputRow()}
            {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => <p key={index}></p>)}
        </div>
    )
}