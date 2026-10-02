import './Characteristics.css'
import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import CapacityDisplay from './components/capacity/Capacity'
import SocialSuitesDisplay from './components/socialSuites/SocialSuites'
import StrengthNDiscount from './components/strengthNDiscount/StrengthNDiscount'
import ReputationDisplay from './components/reputation/ReputationDisplay'
import FlawsDisplay from './components/flaws/Flaws'
import DescriptionsDisplay from './components/descriptions/Descriptions'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import DisplaySingleArray from '../../../../components/displayArray/DisplaySingleArray'

interface Props {
    characteristicsInfo: Characteristics
    pageID: number
    updates: PageType1Updates
}

export default function CharacteristicsDisplay({ characteristicsInfo, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { capacity, socialSuites, culturalStrength, socialSkillDiscount, currentEmotions, reputations, descriptions, flaws } = characteristicsInfo
    const rows = currentEmotions ?? []

    return (
        <div className="characteristics-display-v2">
            <CapacityDisplay capacity={capacity} />

            <h2>Current Emotions</h2>
            <div className="current-emotions-v2">
                <DisplaySingleArray
                    max={6}
                    items={rows}
                    insert={row => updates.insertEmotion(pageID, row)}
                    update={(index, next) => updates.updateEmotion(pageID, index, next.value)}
                    renderRow={(item, _index, onChange) => isEditing ?
                        <input
                            className="character-value"
                            placeholder=" "
                            value={item.value}
                            onChange={event => onChange({ ...item, value: event.target.value })}
                        />
                        :
                        <p className="character-value">{item.value}</p>
                    }
                    renderInsert={onBlur => (
                        <input className="character-value" placeholder=" " onBlur={onBlur} />
                    )}
                    renderLeftover={() => (
                        <p className="character-value"></p>
                    )}
                />
            </div>

            <SocialSuitesDisplay socialSuites={socialSuites} pageID={pageID} updates={updates} />
            <ReputationDisplay reputations={reputations} pageID={pageID} updates={updates} />
            <StrengthNDiscount culturalStrength={culturalStrength} socialSkillDiscount={socialSkillDiscount} pageID={pageID} updates={updates} />
            <DescriptionsDisplay descriptions={descriptions} pageID={pageID} updates={updates} />
            <FlawsDisplay flaws={flaws} pageID={pageID} updates={updates} />
        </div>
    )
}
