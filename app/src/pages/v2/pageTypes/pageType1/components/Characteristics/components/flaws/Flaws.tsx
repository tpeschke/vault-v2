import { Flaw } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Flaws.css'

interface Props {
    flaws: Flaw[]
}

export default function FlawsDisplay({ flaws }: Props) {
    return (
        <div className='flaws-v2'>
            <h2>Flaws</h2>
            {flaws.map(({ id, flaw }) => {
                return (
                    <span key={id}>
                        <p>{flaw}</p>
                    </span>
                )
            })}
            {[...Array(3 - flaws.length)].map((_, index) => {
                return (
                    <span key={index}>
                        <p></p>
                    </span>
                )
            })}
        </div>
    )
}