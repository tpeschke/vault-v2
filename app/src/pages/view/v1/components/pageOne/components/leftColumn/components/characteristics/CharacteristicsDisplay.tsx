import './CharacteristicsDisplay.css'
import GoalsDisplay from './components/GoalsDisplay';
import IntegrityDisplay from "./components/IntegrityDisplay";

interface Props {

}

export default function CharacteristicsDisplay({ }: Props) {
    return (
        <div className="characteristics-shell">
            <h2>Characteristics</h2>
            <IntegrityDisplay />
            <div className='characteristics-columns'>
                <div className='left'>
                    <GoalsDisplay />
                </div>
                <div className='right'>

                </div>
            </div>
        </div>
    )
}