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
                <div className="safehouse-footer-name">
                    <span className="safehouse-footer-wealth">Wealth</span>
                    <input
                        className="character-value"
                        type="number"
                        readOnly={isBlank}
                        value={blankInk(isBlank, page.wealth)}
                        onChange={event => updates.setFooter(page.pageID, 'wealth', numberFromInput(event.target.value))}
                        onBlur={event => updates.blurFooter(page.pageID, 'wealth', numberFromInput(event.target.value))}
                    />
                </div>
                <div className="safehouse-footer-rank"></div>
                <div className="safehouse-footer-ruin">
                    <p className="character-value">{blankInk(isBlank, total)}</p>
                </div>
                <div className="safehouse-footer-rank-ruin"></div>
                <div className="safehouse-footer-space"></div>
                <div className="safehouse-footer-total">Total Ranks</div>
                <div className="safehouse-footer-notes">
                    <span className="safehouse-footer-slash">/</span>
                    <div className="safehouse-footer-slash-gap"></div>
                    <div className="safehouse-footer-space-limit">
                        <input
                            className="character-value"
                            type="number"
                            readOnly={isBlank}
                            value={blankInk(isBlank, page.spaceLimit)}
                            onChange={event => updates.setFooter(page.pageID, 'spaceLimit', numberFromInput(event.target.value))}
                            onBlur={event => updates.blurFooter(page.pageID, 'spaceLimit', numberFromInput(event.target.value))}
                        />
                    </div>
                    <div className="safehouse-footer-upkeep">
                        <p className="character-value">{blankInk(isBlank, upkeep)}</p>
                    </div>
                    <div className="safehouse-footer-copy">
                        <span className="safehouse-footer-space-label">Space Limit</span>
                        <span className="safehouse-footer-upkeep-label">Upkeep <em>1/10th total Ranks in gc</em></span>
                        <span className="safehouse-footer-wear-label">Wear</span>
                    </div>
                    <div className="safehouse-footer-wear">
                        <input
                            className="character-value"
                            type="number"
                            readOnly={isBlank}
                            value={blankInk(isBlank, page.wear)}
                            onChange={event => updates.setFooter(page.pageID, 'wear', numberFromInput(event.target.value))}
                            onBlur={event => updates.blurFooter(page.pageID, 'wear', numberFromInput(event.target.value))}
                        />
                    </div>
                    <div className="safehouse-footer-ten"><span>/</span><span>10</span></div>
                </div>
            </div>
        </div>
    )
}
