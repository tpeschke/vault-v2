import { useContext } from 'react'
import { clampTextareaChange, holdTextareaScroll, isComposingInput, trimTextarea } from '@vault/common/textareaLimits'
import IsBlankContext from '../../pages/v1/contexts/IsBlankContext'
import './TextArea.css'

interface Props {
    lines: number,
    value?: string,
    onChange: any,
    canEdit?: boolean,
    max?: number
}

export default function TextArea({ lines, value, onChange, canEdit, max }: Props) {
    const isBlank = useContext(IsBlankContext)
    const height = `${(lines * 19) - 4}px`

    function emit(next: string) {
        onChange({ target: { value: next } })
    }

    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map((_, index) => <p key={index}></p>)}
            </div>
            {isBlank || !canEdit ? (
                <p style={{ height }}> </p>
            ) : (
                <textarea
                    maxLength={max}
                    value={value != '0' ? value : ''}
                    style={{ height }}
                    onScroll={event => holdTextareaScroll(event.currentTarget)}
                    onChange={event => emit(max == null ? event.target.value : clampTextareaChange(event.target.value, max, isComposingInput(event)))}
                    onCompositionEnd={event => {
                        if (max != null) {
                            emit(trimTextarea(event.currentTarget.value, max))
                        }
                    }}
                />
            )}
        </div>
    )
}
