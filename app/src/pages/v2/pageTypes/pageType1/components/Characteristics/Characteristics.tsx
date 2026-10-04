import './Characteristics.css'
import { Characteristics } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import CapacityDisplay from './components/capacity/Capacity'
import SocialSuitesDisplay from './components/socialSuites/SocialSuites'
import StrengthNDiscount from './components/strengthNDiscount/StrengthNDiscount'
import ReputationDisplay from './components/reputation/ReputationDisplay'
import FlawsDisplay from './components/flaws/Flaws'
import DescriptionsDisplay from './components/descriptions/Descriptions'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import DisplaySingleArray from '../../../../components/displayArray/DisplaySingleArray'

interface Props {
    characteristicsInfo: Characteristics
    pageID: number
    updates: PageType1Updates
}

export default function CharacteristicsDisplay({ characteristicsInfo, pageID, updates }: Props) {
    const { capacity, socialSuites, culturalStrength, socialSkillDiscount, currentEmotions, reputations, descriptions, flaws } = characteristicsInfo
    const rows = currentEmotions ?? []

    return (
        <div className="characteristics-display-v2">
            <CapacityDisplay capacity={capacity} pageID={pageID} updates={updates} />

            <h2>Current Emotions</h2>
            <div className="current-emotions-v2">
                <DisplaySingleArray
                    max={9}
                    showInsert={true}
                    items={rows}
                    insert={row => updates.insertEmotion(pageID, row)}
                    update={(index, next) => updates.updateEmotion(pageID, index, next.value)}
                    renderRow={(item, index, onChange) => (
                        <span>
                            <input
                                className="character-value"
                                placeholder=" "
                                maxLength={25}
                                value={item.value}
                                onChange={event => onChange({ ...item, value: event.target.value })}
                                onBlur={event => {
                                    const value = event.target.value
                                    if (value === '') {
                                        return
                                    }
                                    const nextRows = rows.map((row, rowIndex) => rowIndex === index ? { ...row, value } : row)
                                    updates.persistCurrentEmotions(pageID, nextRows, { index, value })
                                }}
                            />
                        </span>
                    )}
                    renderInsert={onBlur => (
                        <span>
                            <input className="character-value" placeholder=" " maxLength={25} onBlur={onBlur} />
                        </span>
                    )}
                    renderLeftover={() => (
                        <span>
                            <p className="character-value"></p>
                        </span>
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
