import './CharacteristicsDisplay.css'
import FlawsDisplay from './leftColumnComponents/FlawsDisplay';
import GoalsDisplay from './leftColumnComponents/GoalsDisplay';
import IntegrityDisplay from "./leftColumnComponents/IntegrityDisplay";
import RelationshipsDisplay from './leftColumnComponents/RelationshipsDisplay';

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
                    <RelationshipsDisplay />
                    <FlawsDisplay />
                </div>
                <div className='right'>

                </div>
            </div>
        </div>
    )
}