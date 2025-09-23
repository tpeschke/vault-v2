import { PairObject } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import '../DisplayArray.css'
import { useContext } from 'react'
import EditingContext from '../../../contexts/EditingContext'

interface Props {
    max: number,
    arrayToDisplay: PairObject[]
}

export default function DisplaySingleArray({ max, arrayToDisplay }: Props) {
    const isEditing = useContext(EditingContext)

    const leftOver = max - arrayToDisplay.length - (isEditing ? 1 : 0)

    return (
        <div className="display-array-shell single-item">
            {arrayToDisplay.map(formatIntoRow)}
            {isEditing && <input />}
            {[...Array(leftOver).keys()].map((_, index) => <p key={index}></p>)}
        </div>
    )
}

function formatIntoRow(element: PairObject, index: number) {
    return <p key={index}>- {element.title}</p>
}