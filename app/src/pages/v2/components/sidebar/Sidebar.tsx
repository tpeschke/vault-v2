import { useContext } from 'react'
import './Sidebar.css'
import EditingContext from '../../contexts/EditingContext'

interface Props {
    saveCharacter: () => void,
    revertCharacterToUnedited: () => void,
    toggleIsEditing: () => void,
    ownsThisCharacter: boolean
}

export default function Sidebar({
    saveCharacter,
    revertCharacterToUnedited,
    toggleIsEditing,
    ownsThisCharacter
}: Props) {
    const isEditing = useContext(EditingContext)

    return (
        <div className='sidebar-shell'>
            {isEditing &&
                <>
                    <button onClick={saveCharacter}><i className="fa-solid fa-floppy-disk"></i> Save</button>
                    <button onClick={revertCharacterToUnedited}><i className="fa-solid fa-arrow-rotate-left"></i> Revert</button>
                </>
            }
            {!isEditing &&
                <>
                    {ownsThisCharacter && <button onClick={toggleIsEditing}><i className="fa-solid fa-pen-nib"></i> Edit</button>}
                </>
            }
        </div>
    )
}
