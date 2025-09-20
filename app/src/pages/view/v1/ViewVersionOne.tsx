import { useState } from 'react'
import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'

interface Props {

}

export default function ViewVersionOne({ }: Props) {
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
    }

    return (
        <div className='version-one-shell'>
            <div className={viewQuickEdit ? 'page-shell view-quick-edit' : 'page-shell'}>
                <PageOne />
                <PageTwo />
                <PageThree />
            </div>
            <Sidebar toggleViewQuickEdit={toggleViewQuickEdit} viewQuickEdit={viewQuickEdit}/>
        </div>
    )
}