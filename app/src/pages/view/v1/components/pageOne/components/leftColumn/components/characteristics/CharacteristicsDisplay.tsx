import './CharacteristicsDisplay.css'
import FlawsDisplay from './leftColumnComponents/FlawsDisplay';
import GoalsDisplay from './leftColumnComponents/GoalsDisplay';
import IntegrityDisplay from "./leftColumnComponents/IntegrityDisplay";
import RelationshipsDisplay from './leftColumnComponents/RelationshipsDisplay';
import ConvictionsDisplay from './rightColumnComponents/ConvictionsDisplay';
import DescriptionsDisplay from './rightColumnComponents/DescriptionsDisplay';
import ReputationDisplay from './rightColumnComponents/ReputationDisplay';

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
                    <DescriptionsDisplay />
                    <ConvictionsDisplay />
                    <div className="cultural-strength-shell">
                        <h3>Cultural Strength</h3>
                        <p>Creation</p>
                    </div>
                </div>
            </div>
            <ReputationDisplay />
        </div>
    )
}