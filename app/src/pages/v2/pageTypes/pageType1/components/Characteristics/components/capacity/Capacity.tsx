import { Fragment, useContext } from 'react'
import './Capacity.css'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    capacity: number
    pageID: number
    updates: PageType1Updates
}

const BANDS = (capacity: number) => [
    { label: 'Na', value: '<0' },
    { label: 'N', value: `≤${Math.ceil(capacity * .1)}` },
    { label: 'Nb', value: `≤${Math.floor(capacity * .5)}` },
    { label: 'Yb', value: `≤${capacity}` },
    { label: 'Y', value: `≤${capacity * 1.5}` },
    { label: 'Ya', value: `>${capacity * 1.5}` },
]

export default function CapacityDisplay({ capacity, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const bands = BANDS(capacity)

    return (
        <div className="capacity-v2">
            <div className="capacity-headings">
                <h1>Characteristics</h1>
                {bands.map(({ label }) => (
                    <h1 key={label} className='minor-heading'>{label}</h1>
                ))}
            </div>
            <div className="capacity-values">
                <h2>Emotional Capacity</h2>
                {bands.map(({ label, value }, index) => (
                    <Fragment key={label}>
                        {index > 0 && <p className="slash">/</p>}
                        {label === 'Yb' && isEditing ?
                            <span className="capacity-yb character-value">
                                <span>≤</span>
                                <input
                                    className="character-value"
                                    type="number"
                                    placeholder=" "
                                    value={capacity}
                                    onChange={event => {
                                        const n = +event.target.value
                                        updates.updateCapacity(pageID, Number.isFinite(n) ? n : 0)
                                    }}
                                />
                            </span>
                            :
                            <p className="character-value">{value}</p>
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
