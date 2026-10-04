import './CombatSkills.css'
import { useContext } from 'react'
import {
    COMBAT_SUITE_KEYS,
    CombatSuiteKey,
    SkillNumber
} from '@vault/common/interfaces/v2/page2/page2Interfaces'
import { Page2 } from '@vault/common/interfaces/v2/pageTypes'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType2Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import { ADV_COMBAT_CAP } from '../../../../hooks/updates/pageType2Updates'
import DisplayPairArray from '../../../../components/displayArray/DisplayPairArray'

const SUITE_LABELS: Record<CombatSuiteKey, string> = {
    armor: 'Armor',
    melee: 'Melee',
    ranged: 'Ranged',
    shields: 'Shields',
    unarmed: 'Unarmed'
}

interface Props {
    page: Page2
    pageID: number
    updates: PageType2Updates
}

function NumberCell({
    isEditing,
    value,
    onChange
}: {
    isEditing: boolean
    value: SkillNumber
    onChange: (value: SkillNumber) => void
}) {
    return isEditing
        ? <input className="character-value" type="number" placeholder=" " value={value} onChange={event => onChange(event.target.value === '' ? '' : +event.target.value)} />
        : <p className="character-value">{value}</p>
}

export default function CombatSkills({ page, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = page.advancedCombatSkills ?? []

    return (
        <div className="combat-skills-v2">
            <h1>Combat Skills</h1>
            <div className="skill-columns">
                <div className="suites-col">
                    <span className="skill-header">
                        <h2>Combat Suites</h2>
                        <h2>Rank</h2>
                    </span>
                    {COMBAT_SUITE_KEYS.map(key => (
                        <span key={key}>
                            <em>{SUITE_LABELS[key]}</em>
                            <NumberCell
                                isEditing={isEditing}
                                value={page.combatSuites[key].rank}
                                onChange={value => updates.updateCombatSuiteRank(pageID, key, value)}
                            />
                        </span>
                    ))}
                    <span className="discount-row">
                        <h2>Combat Skill Discount</h2>
                        {isEditing
                            ? <input className="character-value" type="number" placeholder=" " value={page.combatSkillDiscount} onChange={event => updates.updateCombatSkillDiscount(pageID, +event.target.value)} />
                            : <p className="character-value">{page.combatSkillDiscount}</p>
                        }
                    </span>
                </div>
                <div className="adv-col">
                    <div className="adv-headers">
                        <span className="skill-header">
                            <h2>Adv Skills</h2>
                            <h2>Rank</h2>
                        </span>
                        <span className="skill-header">
                            <h2>Adv Skills</h2>
                            <h2>Rank</h2>
                        </span>
                    </div>
                    <div className="adv-list">
                        <DisplayPairArray
                            max={ADV_COMBAT_CAP}
                            items={rows.map(row => ({
                                id: row.id,
                                key: row.key,
                                value: row.name,
                                rank: row.rank
                            }))}
                            insert={row => updates.insertAdvancedCombatSkill(pageID, {
                                key: row.key,
                                name: row.value,
                                rank: row.rank === '' ? '' : +row.rank
                            })}
                            update={(index, next) => updates.updateAdvancedCombatSkill(pageID, index, {
                                id: next.id ?? 0,
                                key: next.key,
                                name: next.value,
                                rank: next.rank === '' ? '' : +next.rank
                            })}
                            renderRow={(item, _index, onChange) => (
                                <span>
                                    {isEditing
                                        ? <input className="character-value" placeholder=" " value={item.value} onChange={event => onChange({ ...item, value: event.target.value })} />
                                        : <p className="character-value">{item.value}</p>
                                    }
                                    {isEditing
                                        ? <input
                                            className="character-value"
                                            type="number"
                                            placeholder=" "
                                            value={item.rank}
                                            onChange={event => onChange({
                                                ...item,
                                                rank: event.target.value === '' ? '' : +event.target.value
                                            })}
                                        />
                                        : <p className="character-value">{item.rank}</p>
                                    }
                                </span>
                            )}
                            renderInsert={(onBlurValue, onBlurRank) => (
                                <span>
                                    <input className="character-value" placeholder=" " onBlur={onBlurValue} />
                                    <input className="character-value" type="number" placeholder=" " onBlur={onBlurRank} />
                                </span>
                            )}
                            renderLeftover={() => (
                                <span>
                                    <p className="character-value"></p>
                                    <p className="character-value"></p>
                                </span>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
