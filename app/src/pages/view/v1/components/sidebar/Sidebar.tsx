import './Sidebar.css'

interface Props {
    toggleViewQuickEdit: () => void,
    viewQuickEdit: boolean,
    prepAndDownload: (isPregen: boolean) => void,
    isEditing: boolean
    toggleIsEditing: () => void
}

export default function Sidebar({ toggleViewQuickEdit, viewQuickEdit, prepAndDownload, isEditing, toggleIsEditing }: Props) {
    return (
        <div className='sidebar-shell'>
            {isEditing && <button onClick={toggleIsEditing}><i className="fa-solid fa-floppy-disk"></i> Save</button>}
            {!isEditing &&
                <>
                    <button onClick={toggleIsEditing}><i className="fa-solid fa-pen-nib"></i> Edit</button>
                    <button onClick={_ => prepAndDownload(false)}><i className="fa-solid fa-download"></i> Download</button>
                    <button onClick={_ => prepAndDownload(true)}><i className="fa-solid fa-mask"></i> Download as Pregen</button>
                    {viewQuickEdit ?
                        <button onClick={toggleViewQuickEdit}><i className="fa-solid fa-eye-slash"></i> Hide Quick Edit Locations</button>
                        :
                        <button onClick={toggleViewQuickEdit}><i className="fa-solid fa-eye"></i> Show Quick Edit Locations</button>
                    }
                </>
            }
        </div>
    )
}