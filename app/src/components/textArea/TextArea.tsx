import { useContext } from 'react'
import IsBlankContext from '../../pages/view/v1/contexts/IsBlankContext'
import './TextArea.css'

interface Props {
    lines: number,
    value?: string,
    onChange: any,
    canEdit?: boolean
}

export default function TextArea({ lines, value, onChange, canEdit }: Props) {
    const isBlank = useContext(IsBlankContext)
    
    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map((_, index) => <p key={index}></p>)}
            </div>
            {isBlank || !canEdit ? (
                <p style={{ height: `${(lines * 19) - 4}px` }}> </p>
            ) : (
                <textarea onChange={onChange} value={value != '0' ? value : ''} style={{ height: `${(lines * 19) - 4}px` }} />
            )}
        </div>
    )
}