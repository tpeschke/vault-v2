import './Sidebar.css'

interface Props {

}

export default function Sidebar({}: Props) {
    return (
        <div className='sidebar-shell'>
            <button><i className="fa-solid fa-pen-nib"></i> Edit</button>
            <button><i className="fa-solid fa-download"></i> Download</button>
            <button><i className="fa-solid fa-mask"></i> Download as Pregen</button>
            <button><i className="fa-solid fa-eye"></i> Show Quick Edit Locations</button>
        </div>
    )
}