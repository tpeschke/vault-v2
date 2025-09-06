import Page from '../pages/Page'
import Sidebar from './components/Sidebar'
import './ViewVersionOne.css'

interface Props {

}

export default function ViewVersionOne({ }: Props) {
    return (
        <div className='version-one-shell'>
            <div className='page-shell'>
                <Page />
                <Page />
                <Page />
            </div>
            <Sidebar />
        </div>
    )
}