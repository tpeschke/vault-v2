import { useContext } from 'react'
import EditingContext from '../../pages/view/v1/contexts/EditingContext'
import './TextArea.css'
import TextArea from './TextArea'

interface Props {
    lines: number,
    value?: string
}

export default function DisplayTextArea({ lines, value }: Props) {
    const isEditing = useContext(EditingContext)
    
    if (isEditing) {
        return <TextArea lines={lines} value={value} />
    }

    return (
        <div className="text-area-shell">
            <div>
                {[...Array(lines).keys()].map((_, index) => <p key={index}></p>)}
            </div>
            <p className='value' style={{height: `${lines * 19}px`}} >{value}</p>
        </div>
    )
}