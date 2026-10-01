import './Capacity.css'

interface Props {
    capacity: number
}

export default function CapacityDisplay({ capacity }: Props) {
    return (
        <div className="capacity-v2">
            <div>
                <h1>Characteristics</h1>
                <h2>Emotional Capacity</h2>
            </div>
            <div>
                <h1 className='minor-heading'>Na</h1>
                <p>&lt;0</p>
            </div>
            <div>
                <h1 className='minor-heading'> </h1>
                <p>/</p>
            </div>
            <div>
                <h1 className='minor-heading'>N</h1>
                <p>≤{Math.ceil(capacity * .1)}</p>
            </div>
            <div>
                <h1 className='minor-heading'> </h1>
                <p>/</p>
            </div>
            <div>
                <h1 className='minor-heading'>Nb</h1>
                <p>≤{Math.floor(capacity * .5)}</p>
            </div>
            <div>
                <h1 className='minor-heading'> </h1>
                <p>/</p>
            </div>
            <div>
                <h1 className='minor-heading'>Yb</h1>
                <p>≤{capacity}</p>
            </div>
            <div>
                <h1 className='minor-heading'> </h1>
                <p>/</p>
            </div>
            <div>
                <h1 className='minor-heading'>Y</h1>
                <p>≤{capacity * 1.5}</p>
            </div>
            <div>
                <h1 className='minor-heading'> </h1>
                <p>/</p>
            </div>
            <div>
                <h1 className='minor-heading'>Ya</h1>
                <p>&gt;{capacity * 1.5 }</p>
            </div>
        </div>
    )
}