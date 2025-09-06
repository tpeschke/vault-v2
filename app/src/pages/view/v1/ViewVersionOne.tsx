import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'

interface Props {

}

export default function ViewVersionOne({ }: Props) {
    return (
        <div className='version-one-shell'>
            <div className='page-shell'>
                <PageOne />
                <PageTwo />
                <PageThree />
            </div>
            <Sidebar />
        </div>
    )
}