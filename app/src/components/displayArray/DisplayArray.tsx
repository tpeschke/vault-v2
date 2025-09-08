import { PairObject } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces'
import './DisplayArray.css'

interface Props {
    max: number,
    arrayToDisplay: (string | number)[] | PairObject[]
}

export default function DisplayArray({ max, arrayToDisplay }: Props) {
    const leftOver = max - arrayToDisplay.length

    function formatValue(element: string | number | PairObject) {
        if (typeof element === 'string' || typeof element === 'number') {
            return <p>- {element}</p>
        } else {
            const { title, value } = element
            return (
                <div className='display-pair'>
                    <p>- {title}</p>
                    <p>{value}</p>
                </div>
            )
        }
    }

    return (
        <div className="display-array-shell">
            {arrayToDisplay.map(formatValue)}
            {[...Array(leftOver).keys()].map(_ => <p></p>)}
        </div>
    )
}