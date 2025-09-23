import { CharacteristicInfo } from '@vault/common/interfaces/v1/pageOne/leftColumnInterfaces';
import TextArea from '../../../../../../../../../components/textArea/TextArea';
import './CharacteristicsDisplay.css'
import FlawsDisplay from './leftColumnComponents/FlawsDisplay';
import GoalsDisplay from './leftColumnComponents/GoalsDisplay';
import IntegrityDisplay from "./leftColumnComponents/IntegrityDisplay";
import RelationshipsDisplay from './leftColumnComponents/RelationshipsDisplay';
import ConvictionsDisplay from './rightColumnComponents/ConvictionsDisplay';
import DescriptionsDisplay from './rightColumnComponents/DescriptionsDisplay';
import ReputationDisplay from './rightColumnComponents/ReputationDisplay';

interface Props {
    characteristicInfo: CharacteristicInfo,
    isEditing: boolean
}

export default function CharacteristicsDisplay({ characteristicInfo }: Props) {
    const { integrityInfo, goals, descriptions, convictions, relationships, flaws, culturalStrength, reputation, assets} = characteristicInfo

    return (
        <div className="characteristics-shell">
            <h2>Characteristics</h2>
            <IntegrityDisplay integrityInfo={integrityInfo}/>
            <div className='characteristics-columns'>
                <div className='left'>
                    <GoalsDisplay goals={goals}/>
                    <RelationshipsDisplay relationships={relationships} />
                    <FlawsDisplay flaws={flaws}/>
                </div>
                <div className='right'>
                    <DescriptionsDisplay descriptions={descriptions} />
                    <ConvictionsDisplay convictions={convictions}/>
                    <div className="cultural-strength-shell">
                        <h3>Cultural Strength</h3>
                        <p>{culturalStrength}</p>
                    </div>
                </div>
            </div>
            <ReputationDisplay reputation={reputation}/>
            <h3>Allies, Contacts, & Assets</h3>
            <TextArea lines={6} value={assets}/>
        </div>
    )
}