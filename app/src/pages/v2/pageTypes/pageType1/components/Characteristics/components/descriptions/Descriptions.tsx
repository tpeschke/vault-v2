import { Description } from '@vault/common/interfaces/v2/page1/characteristicsInfo'
import './Descriptions.css'

interface Props {
    descriptions: Description[]
}

export default function DescriptionsDisplay({ descriptions }: Props) {
    const rows = descriptions ?? []

    return (
        <div className='descriptions-v2'>
            <h2>Descriptions</h2>
            {rows.map(({ id, value }) => {
                return (
                    <span key={id}>
                        <p>{value}</p>
                    </span>
                )
            })}
            {[...Array(Math.max(0, 5 - rows.length))].map((_, index) => {
                return (
                    <span key={index}>
                        <p></p>
                    </span>
                )
            })}
        </div>
    )
}
