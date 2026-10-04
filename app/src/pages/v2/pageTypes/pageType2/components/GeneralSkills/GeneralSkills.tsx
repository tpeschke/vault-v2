import './GeneralSkills.css'
import { FocusEvent, Fragment, useContext, useState } from 'react'
import {
    GENERAL_SUITE_KEYS,
    GeneralSuiteKey,
    SkillNumber
} from '@vault/common/interfaces/v2/page2/page2Interfaces'
import { Page2 } from '@vault/common/interfaces/v2/pageTypes'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType2Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import { ADV_GENERAL_CAP } from '../../../../hooks/updates/pageType2Updates'
import makeTempID from '../../../../../../utilities/makeTempId'

const SUITE_LABELS: Record<GeneralSuiteKey, string> = {
    athletics: 'Athletics',
    lore: 'Lore',
    strategy: 'Strategy',
    streetwise: 'Streetwise',
    survival: 'Survival',
    trades: 'Trades',
    weirdcraft: 'Weirdcraft'
}

interface Props {
    page: Page2
    pageID: number
    updates: PageType2Updates
}

const emptyDraft = { name: '', stat: '' as SkillNumber, rank: '' as SkillNumber }

function numberFromInput(event: FocusEvent<HTMLInputElement> | { target: { value: string } }): SkillNumber {
    const raw = event.target.value
    return raw === '' ? '' : +raw
}

function hasContent(row: { name: string, stat: SkillNumber, rank: SkillNumber }) {
    return row.name !== '' || row.stat !== '' || row.rank !== ''
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

export default function GeneralSkills({ page, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const rows = page.advancedGeneralSkills ?? []
    const leftover = ADV_GENERAL_CAP - rows.length - (isEditing ? 1 : 0)
    const showInsert = isEditing && leftover > -1
    const [draft, setDraft] = useState(emptyDraft)
    const [insertReset, setInsertReset] = useState(0)

    function handleInsertBlur(field: keyof typeof emptyDraft, event: FocusEvent<HTMLInputElement>) {
        const next = {
            ...draft,
            [field]: field === 'name' ? event.target.value : numberFromInput(event)
        }
        if (hasContent(next)) {
            updates.insertAdvancedGeneralSkill(pageID, { key: makeTempID(), ...next })
            setDraft(emptyDraft)
            setInsertReset(count => count + 1)
        } else {
            setDraft(next)
        }
    }

    return (
        <div className="general-skills-v2">
            <h1>General Skills</h1>
            <div className="skill-columns">
                <div className="suites-col">
                    <span className="skill-header">
                        <h2>Gen. Suites</h2>
                        <h2>Stat</h2>
                        <h2>Rank</h2>
                    </span>
                    {GENERAL_SUITE_KEYS.map(key => (
                        <span key={key}>
                            <em>{SUITE_LABELS[key]}</em>
                            <NumberCell
                                isEditing={isEditing}
                                value={page.generalSuites[key].stat}
                                onChange={value => updates.updateGeneralSuiteField(pageID, key, 'stat', value)}
                            />
                            <NumberCell
                                isEditing={isEditing}
                                value={page.generalSuites[key].rank}
                                onChange={value => updates.updateGeneralSuiteField(pageID, key, 'rank', value)}
                            />
                        </span>
                    ))}
                    <span className="native-language-row">
                        <em>Native Language</em>
                        <span className="native-language-name">
                            {isEditing
                                ? <input className="character-value" placeholder=" " value={page.nativeLanguage.name} onChange={event => updates.updateNativeLanguage(pageID, { name: event.target.value })} />
                                : <p className="character-value">{page.nativeLanguage.name}</p>
                            }
                            <NumberCell
                                isEditing={isEditing}
                                value={page.nativeLanguage.stat}
                                onChange={value => updates.updateNativeLanguage(pageID, { stat: value })}
                            />
                            <NumberCell
                                isEditing={isEditing}
                                value={page.nativeLanguage.rank}
                                onChange={value => updates.updateNativeLanguage(pageID, { rank: value })}
                            />
                        </span>
                    </span>
                    <span className="discount-row">
                        <strong>Armor Skill Adj</strong>
                        {isEditing
                            ? <input className="character-value" type="number" placeholder=" " value={page.armorSkillAdj} onChange={event => updates.updateArmorSkillAdj(pageID, +event.target.value)} />
                            : <p className="character-value">{page.armorSkillAdj}</p>
                        }
                    </span>
                    <span className="discount-row">
                        <em>Gen. Skill Discount</em>
                        {isEditing
                            ? <input className="character-value" type="number" placeholder=" " value={page.genSkillDiscount} onChange={event => updates.updateGenSkillDiscount(pageID, +event.target.value)} />
                            : <p className="character-value">{page.genSkillDiscount}</p>
                        }
                    </span>
                    <textarea
                        className="character-value leftover-notes"
                        value={page.generalSkillNotes}
                        onChange={event => updates.updateGeneralSkillNotes(pageID, event.target.value)}
                        onBlur={event => updates.persistViewField(pageID, 'generalSkillNotes', event.target.value)}
                    />
                </div>
                <div className="adv-col">
                    <div className="adv-headers">
                        <span className="skill-header">
                            <h2>Adv Skills</h2>
                            <h2>Stat</h2>
                            <h2>Rank</h2>
                        </span>
                        <span className="skill-header">
                            <h2>Adv Skills</h2>
                            <h2>Stat</h2>
                            <h2>Rank</h2>
                        </span>
                    </div>
                    <div className="adv-list">
                        {rows.map((item, index) => (
                            <Fragment key={item.key ?? item.id ?? index}>
                                <span>
                                    {isEditing
                                        ? <input className="character-value" placeholder=" " value={item.name} onChange={event => updates.updateAdvancedGeneralSkill(pageID, index, { ...item, name: event.target.value })} />
                                        : <p className="character-value">{item.name}</p>
                                    }
                                    <NumberCell
                                        isEditing={isEditing}
                                        value={item.stat}
                                        onChange={value => updates.updateAdvancedGeneralSkill(pageID, index, { ...item, stat: value })}
                                    />
                                    <NumberCell
                                        isEditing={isEditing}
                                        value={item.rank}
                                        onChange={value => updates.updateAdvancedGeneralSkill(pageID, index, { ...item, rank: value })}
                                    />
                                </span>
                            </Fragment>
                        ))}
                        {showInsert && (
                            <Fragment key={insertReset}>
                                <span>
                                    <input className="character-value" placeholder=" " onBlur={event => handleInsertBlur('name', event)} />
                                    <input className="character-value" type="number" placeholder=" " onBlur={event => handleInsertBlur('stat', event)} />
                                    <input className="character-value" type="number" placeholder=" " onBlur={event => handleInsertBlur('rank', event)} />
                                </span>
                            </Fragment>
                        )}
                        {leftover > -1 && [...Array(leftover).keys()].map(index => (
                            <span key={`leftover-${index}`}>
                                <p className="character-value"></p>
                                <p className="character-value"></p>
                                <p className="character-value"></p>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
