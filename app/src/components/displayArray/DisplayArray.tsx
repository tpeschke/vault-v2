import './DisplayArray.css'

interface Props {
    max: number,
    arrayToDisplay: (string | number)[]
}

export default function DisplayArray({ max, arrayToDisplay }: Props) {
    const leftOver = max - arrayToDisplay.length

    return (
        <div className="display-array-shell">
            {arrayToDisplay.map(element => <p>- {element}</p>)}
            {[...Array(leftOver).keys()].map(_ => <p></p>)}
        </div>
    )
}