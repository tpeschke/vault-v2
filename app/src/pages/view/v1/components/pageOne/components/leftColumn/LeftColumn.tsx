import MovementDisplay from './components/MovementDisplay'
import StatsDisplay from './components/StatsDisplay'
import './LeftColumn.css'

interface Props {

}

export default function LeftColumn({ }: Props) {
    return (
        <div className='left'>
            <div className='flex-pair'>
                <StatsDisplay />
                <MovementDisplay />
            </div>
        </div>
    )
}