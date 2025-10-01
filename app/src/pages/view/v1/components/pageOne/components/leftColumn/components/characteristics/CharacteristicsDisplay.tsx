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
import { useContext } from 'react';
import EditingContext from '../../../../../../contexts/EditingContext';
import { CharacteristicUpdateFunctions } from '../../../../../../hooks/interfaces/CharacterHookInterfaces';

interface Props {
    characteristicInfo: CharacteristicInfo,
    characteristicUpdateFunctions: CharacteristicUpdateFunctions
}

export default function CharacteristicsDisplay({ characteristicInfo, characteristicUpdateFunctions }: Props) {
    const isEditing = useContext(EditingContext)

    const { integrityInfo, goals, descriptions, convictions, relationships, flaws, culturalStrength, reputation, assets } = characteristicInfo
    const { updateIntegrityInfo, insertCharacteristic, updateCharacteristic } = characteristicUpdateFunctions

    return (
        <div className="characteristics-shell">
            <h2>Characteristics</h2>
            <IntegrityDisplay integrityInfo={integrityInfo} updateIntegrityInfo={updateIntegrityInfo}/>
            <div className='characteristics-columns'>
                <div className='left'>
                    <GoalsDisplay goals={goals} insertGoal={insertCharacteristic('goals')} updateGoal={updateCharacteristic('goals')}/>
                    <RelationshipsDisplay relationships={relationships} insertRelationship={insertCharacteristic('relationships')} updateRelationship={updateCharacteristic('relationships')}/>
                    <FlawsDisplay flaws={flaws} />
                </div>
                <div className='right'>
                    <DescriptionsDisplay descriptions={descriptions} />
                    <ConvictionsDisplay convictions={convictions} />
                    <div className="cultural-strength-shell">
                        <h3>Cultural Strength</h3>
                        {isEditing ?
                            <input value={culturalStrength} />
                            :
                            <p>{culturalStrength}</p>
                        }
                    </div>
                </div>
            </div>
            <ReputationDisplay reputation={reputation} />
            <h3>Allies, Contacts, & Assets</h3>
            <TextArea lines={6} value={assets} />
        </div>
    )
}