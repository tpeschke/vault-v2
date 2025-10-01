import './TextArea.css'

interface Props {
    lines: number,
    value?: string,
    onChange: any
}

export default function TextArea({ lines, value, onChange }: Props) {
    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map((_, index) => <p key={index}></p>)}
            </div>
            <textarea onChange={onChange} value={value != '0' ? value : undefined} style={{height: `${(lines * 19) - 4}px`}} />
        </div>
    )
}