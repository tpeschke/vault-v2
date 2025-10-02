import { useContext } from 'react'
import EditingContext from '../../pages/view/v1/contexts/EditingContext'
import './TextArea.css'
import TextArea from './TextArea'
import { UpdateAbilitiesFunction } from '../../pages/view/v1/hooks/interfaces/UpdateRightColumnInterfaces'

interface Props {
    lines: number,
    value?: string,
    onChange?: UpdateAbilitiesFunction
}

export default function DisplayTextArea({ lines, value, onChange }: Props) {
    const isEditing = useContext(EditingContext)
    
    if (isEditing) {
        return <TextArea lines={lines} value={value} onChange={onChange}/>
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