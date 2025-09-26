import { GeneralNotesInfo } from '@vault/common/interfaces/v1/pageThree/generalNotesInterfaces'
import TextArea from '../../../../../../components/textArea/TextArea'
import '../PageThree.css'
import { useContext } from 'react'
import EditingContext from '../../../contexts/EditingContext'

interface Props {
    generalNotes: GeneralNotesInfo
}

export default function GeneralInfoDisplay({ generalNotes }: Props) {
    const isEditing = useContext(EditingContext)

    const { notes, isSecret } = generalNotes

    const tooltip = isSecret ? "Only You Can View These Notes" : "Anyone Can View These Notes"

    return (
        <>
            <span className='general-info-heading'>
                <h2>General Info</h2>
                {isEditing &&
                    <span>
                        <p>Is Secret?</p>
                        <div className='fake-button' data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
                            {isSecret ?
                                <i className="fa-solid fa-eye-slash" ></i>
                                :
                                <i className="fa-solid fa-eye"></i>
                            }
                        </div>
                    </span>
                }
            </span>
            <TextArea lines={53} value={notes} />
        </>
    )
}