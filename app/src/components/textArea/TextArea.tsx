import './TextArea.css'

interface Props {
    lines: number,
    value?: string
}

export default function TextArea({ lines, value }: Props) {
    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map((_, index) => <p key={index}></p>)}
            </div>
            <textarea value={value} style={{height: `${(lines * 19) - 4}px`}} />
        </div>
    )
}