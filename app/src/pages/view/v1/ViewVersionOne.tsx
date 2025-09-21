import { useState } from 'react'
import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'

interface Props {
    character: CharacterVersion1
}

export default function ViewVersionOne({ character }: Props) {
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
    }

    const { pageOneInfo, pageTwoInfo, generalNotes } = character

    const int = pageOneInfo.leftColumnInfo.statInfo.int

    return (
        <div className='version-one-shell'>
            <div className={viewQuickEdit ? 'page-shell view-quick-edit' : 'page-shell'}>
                <PageOne pageOneInfo={pageOneInfo} />
                <PageTwo pageTwoInfo={pageTwoInfo} int={int}/>
                {!generalNotes.isSecret && <PageThree generalNotes={generalNotes}/>}
            </div>
            <Sidebar toggleViewQuickEdit={toggleViewQuickEdit} viewQuickEdit={viewQuickEdit}/>
        </div>
    )
}