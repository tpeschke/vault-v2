import GearDisplay from './components/gearDisplay/GearDisplay'
import './PageTwo.css'

interface Props {

}

export default function PageTwo({}: Props) {
    return (
        <div className='page-shell page card page-two'>
            <GearDisplay />
        </div>
    )
}