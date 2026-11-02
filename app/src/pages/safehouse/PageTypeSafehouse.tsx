import './PageTypeSafehouse.css'
import { useContext } from 'react'
import { SafehousePage1, safehouseTotalRanks, safehouseUpkeep } from '@vault/common/interfaces/safehouse/safehouse'
import wordmark from '../../assets/images/bonfire-wordmark.png'
import BlankContext, { blankInk } from '../v2/contexts/BlankContext'
import EditingContext from '../v2/contexts/EditingContext'
import Functions from './Functions'
import { SafehouseUpdates } from './safehouseHook'

interface Props {
    page: SafehousePage1,
    updates: SafehouseUpdates
}

const sections = [
    { key: 'living' as const, label: 'Living Space' },
    { key: 'workspace' as const, label: 'Workspace' },
    { key: 'recreational' as const, label: 'Recreational Space' },
    { key: 'defenses' as const, label: 'Defenses' }
]

function numberFromInput(raw: string) {
    if (raw === '') {
        return '' as const
    }
    const value = Number(raw)
    return Number.isFinite(value) ? value : ''
}

export default function PageTypeSafehouse({ page, updates }: Props) {
    const isBlank = useContext(BlankContext)
    const isEditing = useContext(EditingContext)
    const total = safehouseTotalRanks(page)
    const upkeep = safehouseUpkeep(total)

    return (
        <div className="page card page-type-safehouse">
            <div className="safehouse-header">
                <div className="safehouse-header-fields">
                    <label>
                        <strong>Safehouse Name</strong>
                        {isEditing && !isBlank ? (
                            <input
                                className="character-value"
                                maxLength={250}
                                value={page.name}
                                onChange={event => updates.setHeader(page.pageID, 'name', event.target.value)}
                            />
                        ) : (
                            <p className="character-value">{blankInk(isBlank, page.name)}</p>
                        )}
                    </label>
                    <div className="safehouse-header-line">
                        <label>
                            <strong>Location</strong>
                            {isEditing && !isBlank ? (
                                <input
                                    className="character-value"
                                    maxLength={250}
                                    value={page.location}
                                    onChange={event => updates.setHeader(page.pageID, 'location', event.target.value)}
                                />
                            ) : (
                                <p className="character-value">{blankInk(isBlank, page.location)}</p>
                            )}
                        </label>
                        <label>
                            <strong>C Rank Limit</strong>
                            {isEditing && !isBlank ? (
                                <input
                                    className="character-value"
                                    type="number"
                                    value={page.cRankLimit}
                                    onChange={event => updates.setHeader(page.pageID, 'cRankLimit', numberFromInput(event.target.value))}
                                />
                            ) : (
                                <p className="character-value">{blankInk(isBlank, page.cRankLimit)}</p>
                            )}
                            <em>x2 C of location</em>
                        </label>
                    </div>
                </div>
                <img className="safehouse-wordmark" src={wordmark} alt="Bonfire The Roleplaying Game" />
            </div>
            <h1>Functions</h1>
            {sections.map(section => (
                <Functions
                    key={section.key}
                    section={section.key}
                    label={section.label}
                    rows={page.functions[section.key]}
                    onCommit={(index, next) => updates.commitFunction(page.pageID, section.key, index, next)}
                    onInsert={row => updates.insertFunction(page.pageID, section.key, row)}
                    onBlurCell={(row, field) => updates.blurFunctionCell(page.pageID, section.key, row, field)}
                    onToggleR={(index, row) => updates.toggleFunctionR(page.pageID, section.key, index, row)}
                />
            ))}
            <div className="safehouse-footer">
                <div>
                    <span>Wealth</span>
                    <input
                        className="character-value"
                        type="number"
                        readOnly={isBlank}
                        value={blankInk(isBlank, page.wealth)}
                        onChange={event => updates.setFooter(page.pageID, 'wealth', numberFromInput(event.target.value))}
                        onBlur={event => updates.blurFooter(page.pageID, 'wealth', numberFromInput(event.target.value))}
                    />
                    <span>/</span>
                    <span>Space Limit</span>
                    <input
                        className="character-value"
                        type="number"
                        readOnly={isBlank}
                        value={blankInk(isBlank, page.spaceLimit)}
                        onChange={event => updates.setFooter(page.pageID, 'spaceLimit', numberFromInput(event.target.value))}
                        onBlur={event => updates.blurFooter(page.pageID, 'spaceLimit', numberFromInput(event.target.value))}
                    />
                </div>
                <div>
                    <span>Wear</span>
                    <input
                        className="character-value"
                        type="number"
                        readOnly={isBlank}
                        value={blankInk(isBlank, page.wear)}
                        onChange={event => updates.setFooter(page.pageID, 'wear', numberFromInput(event.target.value))}
                        onBlur={event => updates.blurFooter(page.pageID, 'wear', numberFromInput(event.target.value))}
                    />
                    <span>/</span>
                    <span>10</span>
                </div>
                <div>
                    <span>Total Ranks</span>
                    <p className="character-value">{blankInk(isBlank, total)}</p>
                </div>
                <div>
                    <span>Upkeep</span>
                    <p className="character-value">{blankInk(isBlank, upkeep)}</p>
                    <em>1/10th total Ranks in gc</em>
                </div>
            </div>
        </div>
    )
}
