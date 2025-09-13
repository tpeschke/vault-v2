import GeneralInfoDisplay from './components/GeneralInfo'
import './PageThree.css'

interface Props {

}

export default function PageThree({}: Props) {
    return (
        <div className='page-shell page card page-three'>
            <GeneralInfoDisplay />
        </div>
    )
}