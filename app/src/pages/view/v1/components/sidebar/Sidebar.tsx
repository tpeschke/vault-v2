import './Sidebar.css'

interface Props {
    toggleViewQuickEdit: () => void,
    viewQuickEdit: boolean,
    prepAndDownload: () => void
}

export default function Sidebar({ toggleViewQuickEdit, viewQuickEdit, prepAndDownload }: Props) {
    return (
        <div className='sidebar-shell'>
            <button><i className="fa-solid fa-pen-nib"></i> Edit</button>
            <button onClick={prepAndDownload}><i className="fa-solid fa-download"></i> Download</button>
            <button><i className="fa-solid fa-mask"></i> Download as Pregen</button>
            {viewQuickEdit ?
                <button onClick={toggleViewQuickEdit}><i className="fa-solid fa-eye-slash"></i> Hide Quick Edit Locations</button>
                :
                <button onClick={toggleViewQuickEdit}><i className="fa-solid fa-eye"></i> Show Quick Edit Locations</button>
            }
        </div>
    )
}