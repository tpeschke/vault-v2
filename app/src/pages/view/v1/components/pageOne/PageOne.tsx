import AbilitiesNBurdensDisplay from './components/abilitiesNBurdens/AbilitiesNBurdensDisplay'
import GeneralInfo from './components/generalInfo/GeneralInfo'
import LeftColumn from './components/leftColumn/LeftColumn'
import RightColumn from './components/rightColumn/RightColumn'
import './PageOne.css'

interface Props {

}

export default function PageOne({}: Props) {
    return (
        <div className='page-shell page card page-one'>
            <GeneralInfo />
            <div className='page-one-columns'>
                <LeftColumn />
                <RightColumn />
            </div>
            <AbilitiesNBurdensDisplay />
        </div>
    )
}