import { GeneralNotesInfo } from '@vault/common/interfaces/v1/pageThree/generalNotesInterfaces'
import TextArea from '../../../../../../components/textArea/TextArea'
import '../PageThree.css'
import { useContext } from 'react'
import EditingContext from '../../../contexts/EditingContext'
import { UpdateNotes } from '../../../hooks/interfaces/pageThreeInterfaces/generalNotesInterfaces'

interface Props {
    generalNotes: GeneralNotesInfo,
    updateNotes: UpdateNotes
}

export default function GeneralInfoDisplay({ generalNotes, updateNotes }: Props) {
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
                        <div onClick={_ => updateNotes('isSecret', !isSecret)} className='fake-button' data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
                            {isSecret ?
                                <i className="fa-solid fa-eye-slash" ></i>
                                :
                                <i className="fa-solid fa-eye"></i>
                            }
                        </div>
                    </span>
                }
            </span>
            <TextArea onChange={(event: any) => updateNotes('notes', event.target.value)} lines={53} value={notes} />
        </>
    )
}