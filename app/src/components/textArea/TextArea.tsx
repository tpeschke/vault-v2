import './TextArea.css'

interface Props {
    lines: number,
    value?: string,
    onChange: any,
    isBlank?: boolean
}

export default function TextArea({ lines, value, onChange, isBlank }: Props) {
    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map((_, index) => <p key={index}></p>)}
            </div>
            {isBlank ? (
                <p style={{ height: `${(lines * 19) - 4}px` }}> </p>
            ) : (
                <textarea onChange={onChange} value={value != '0' ? value : ''} style={{ height: `${(lines * 19) - 4}px` }} />
            )}
        </div>
    )
}