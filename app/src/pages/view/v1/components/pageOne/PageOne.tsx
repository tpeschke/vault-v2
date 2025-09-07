import AbilitiesNBurdensDisplay from './components/abilitiesNBurdens/AbilitiesNBurdensDisplay'
import GeneralInfo from './components/generalInfo/GeneralInfo'
import LeftColumn from './components/leftColumn/LeftColumn'
import './PageOne.css'

interface Props {

}

export default function PageOne({}: Props) {
    return (
        <div className='page-shell page card page-one'>
            <GeneralInfo />
            <div className='page-one-columns'>
                <LeftColumn />
                <div className='right'>

                </div>
            </div>
            <AbilitiesNBurdensDisplay />
        </div>
    )
}