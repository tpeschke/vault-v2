import './TextArea.css'

interface Props {
    lines: number,
    value?: string
}

export default function DisplayTextArea({ lines, value }: Props) {
    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map(_ => <p></p>)}
            </div>
            <p className='value' style={{height: `${lines * 19}px`}} >{value}</p>
        </div>
    )
}