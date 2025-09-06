import GeneralInfo from './components/generalInfo/GeneralInfo'
import './PageOne.css'

interface Props {

}

export default function PageOne({}: Props) {
    return (
        <div className='page-shell page card page-one'>
            <GeneralInfo />
            <div className='page-one-columns'>
                <div className='left'>

                </div>
                <div className='right'>

                </div>
            </div>
            <div className='abilities-and-burdens-shell'></div>
        </div>
    )
}