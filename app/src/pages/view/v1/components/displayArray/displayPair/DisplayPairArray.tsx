import { PairObject } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import '../DisplayArray.css'
import { useContext } from 'react'
import EditingContext from '../../../contexts/EditingContext'

interface Props {
    max: number,
    arrayToDisplay: PairObject[]
}

export default function DisplayPairArray({ max, arrayToDisplay }: Props) {
    const isEditing = useContext(EditingContext)

    const leftOver = max - arrayToDisplay.length - (isEditing ? 1 : 0)

    return (
        <div className="display-array-shell multi-item">
            {arrayToDisplay.map(formatIntoRow)}
            {isEditing && formatNewInputRow()}
            {[...Array(leftOver).keys()].map((_, index) => <p key={index}></p>)}
        </div>
    )
}

function formatIntoRow(element: PairObject, index: number) {
    const { title, value } = element
    return (
        <div key={index} className='display-pair'>
            <p>- {title}</p>
            <p>{value}</p>
        </div>
    )
}

function formatNewInputRow() {
    return (
        <div className='display-pair'>
            <input />
            <input />
        </div>
    )
}