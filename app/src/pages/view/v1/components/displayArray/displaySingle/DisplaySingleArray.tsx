import { PairObject } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import '../DisplayArray.css'
import { useContext } from 'react'
import EditingContext from '../../../contexts/EditingContext'
import { InsertCharacteristicFunction, UpdateCharacteristicFunction } from '../../../hooks/interfaces/UpdateCharacterFunctionInterfaces'

interface Props {
    max: number,
    arrayToDisplay: PairObject[],
    insertFunction?: InsertCharacteristicFunction,
    updateFunction?: UpdateCharacteristicFunction
}

export default function DisplaySingleArray({ max, arrayToDisplay, insertFunction, updateFunction }: Props) {
    const isEditing = useContext(EditingContext)

    const leftOver = max - arrayToDisplay.length - (isEditing ? 1 : 0)

    function updateRow(index: number, object: PairObject, value: string | number) {
        if (updateFunction) {
            updateFunction(index, {
                ...object,
                value
            })
        }
    }

    function formatIntoRow({ value }: PairObject, index: number) {
        if (isEditing) {
            return <input onChange={(event: any) => updateRow(index, { title: undefined, value }, event.target.value)} key={index} value={value} />
        }
        return <p key={index}>- {value}</p>
    }

    function insertPairObject(event: any) {
        const { value } = event.target
        if (insertFunction && value !== '') {
            insertFunction({ title: undefined, value })
            event.target.value = ''
        }
    }

    const showEditInputs = isEditing && leftOver > -1

    return (
        <div className="display-array-shell single-item">
            {arrayToDisplay.map(formatIntoRow)}
            {showEditInputs && <input onBlur={insertPairObject} />}
            {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => <p key={index}></p>)}
        </div>
    )
}
