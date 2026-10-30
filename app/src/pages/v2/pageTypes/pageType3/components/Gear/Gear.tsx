import './Gear.css'
import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import {
    isDefaultSSlot,
    Page3Coinage,
    Page3GearSlot
} from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import personMeditating from './assets/person-meditating-solid-full.svg'

interface Props {
    page: Page3
    pageID: number
    updates: PageType3Updates
}

interface GearRowSpec {
    slot: Page3GearSlot
    label?: string
    arrow?: boolean
    bar?: boolean
    qm?: number
}

const LEFT_ROWS: GearRowSpec[] = [
    { slot: 'head', label: 'Head', arrow: true },
    { slot: 'chest', label: 'Chest', arrow: true },
    { slot: 'coat', label: 'Coat', arrow: true },
    { slot: 'gloves', label: 'Gloves', arrow: true },
    { slot: 'pants', label: 'Pants', arrow: true },
    { slot: 'shoes', label: 'Shoes', arrow: true },
    { slot: 'armor', label: 'Armor', arrow: true },
    { slot: 'lHand', label: 'L. Hand', arrow: true },
    { slot: 'rHand', label: 'R. Hand', arrow: true }
]

const CONTAINER_ROWS: GearRowSpec[] = [
    { slot: 'backpack', label: 'Backpack', bar: true },
    { slot: 'leftS1' }, { slot: 'leftS2' }, { slot: 'leftS3' }, { slot: 'leftS4' }, { slot: 'leftS5' },
    { slot: 'leftS6' }, { slot: 'leftS7' }, { slot: 'leftS8' }, { slot: 'leftS9' },
    { slot: 'pouch1', label: 'Pouch', bar: true },
    { slot: 'leftS10' }, { slot: 'leftS11' },
    { slot: 'pouch2', label: 'Pouch', bar: true },
    { slot: 'leftS12' }, { slot: 'leftS13' },
    { slot: 'pouch3', label: 'Pouch', bar: true },
    { slot: 'leftS14' }, { slot: 'leftS15' },
    { slot: 'heldBag1', label: 'Held Bag', bar: true },
    { slot: 'midS1' }, { slot: 'midS2' }, { slot: 'midS3' },
    { slot: 'heldBag2', label: 'Held Bag', bar: true },
    { slot: 'midS4' }, { slot: 'midS5' }, { slot: 'midS6' }
]

const OTHER_ROWS: GearRowSpec[] = [
    { slot: 'other1', label: 'Other Containers', bar: true },
    { slot: 'other2', arrow: true },
    { slot: 'other3', arrow: true },
    { slot: 'other4', arrow: true }
]

const CARRY_ROWS: GearRowSpec[] = [
    { slot: 'carryM4' }, { slot: 'carryM3' }, { slot: 'carryM2' }, { slot: 'carryM1' }, { slot: 'carry0' },
    { slot: 'carryP1' }, { slot: 'carryP2' }, { slot: 'carryP3' }, { slot: 'carryP4' }, { slot: 'carryP5' },
    { slot: 'carry11' }, { slot: 'carry12' }, { slot: 'carry13' }, { slot: 'carry14' },
    { slot: 'carry15' }, { slot: 'carry16' }, { slot: 'carry17' }, { slot: 'carry18' }
]

const QM_ROWS: GearRowSpec[] = [
    { slot: 'qm1', qm: 1 }, { slot: 'qm2', qm: 2 }, { slot: 'qm3', qm: 3 }, { slot: 'qm4', qm: 4 }, { slot: 'qm5', qm: 5 },
    { slot: 'qm6', qm: 6 }, { slot: 'qm7', qm: 7 }, { slot: 'qm8', qm: 8 }, { slot: 'qm9', qm: 9 }, { slot: 'qm10', qm: 10 },
    { slot: 'qm11', qm: 11 }, { slot: 'qm12', qm: 12 }, { slot: 'qm13', qm: 13 }, { slot: 'qm14', qm: 14 }, { slot: 'qm15', qm: 15 }
]

const TINY_ROWS: GearRowSpec[] = [
    { slot: 'tiny1' }, { slot: 'tiny2' }, { slot: 'tiny3' }, { slot: 'tiny4' }, { slot: 'tiny5' },
    { slot: 'tiny6' }, { slot: 'tiny7' }, { slot: 'tiny8' }, { slot: 'tiny9' }, { slot: 'tiny10' },
    { slot: 'tiny11' }, { slot: 'tiny12' }, { slot: 'tiny13' }
]

function numberFromInput(raw: string): SkillNumber {
    return raw === '' ? '' : +raw
}

function coinSizeText(count: SkillNumber): string {
    const n = typeof count === 'number' && Number.isFinite(count) ? Math.trunc(count) : 0
    const sign = n < 0 ? '-' : ''
    const abs = Math.abs(n)
    const whole = Math.floor(abs / 100)
    const rem = abs % 100
    if (rem === 0) return `${sign}${whole}s`
    const frac = String(rem).padStart(2, '0').replace(/0+$/, '')
    return `${sign}${whole}.${frac}s`
}

function GearFlag({ checked, onToggle }: { checked: boolean, onToggle: () => void }) {
    return (
        <span
            className={`page3-flag-box${checked ? ' checked' : ''}`}
            onClick={onToggle}
        >
            {checked && <i className="fa-solid fa-check"></i>}
        </span>
    )
}

function GearRow({
    spec,
    page,
    pageID,
    updates
}: {
    spec: GearRowSpec
    page: Page3
    pageID: number
    updates: PageType3Updates
}) {
    if (spec.bar) {
        return (
            <span className="page3-gear-row page3-gear-bar-row">
                <em className="page3-gear-label">{spec.label}</em>
            </span>
        )
    }
    const cell = page.gear[spec.slot]
    return (
        <span className="page3-gear-row">
            <span className="page3-gear-item">
                {spec.label && <em className="page3-gear-label">{spec.label}</em>}
                {spec.qm !== undefined && <em className="page3-gear-label">{spec.qm}</em>}
                <input
                    className="character-value"
                    placeholder=" "
                    value={cell.item}
                    onChange={event => updates.updateGearCell(pageID, spec.slot, { item: event.target.value })}
                    onBlur={event => updates.persistPage3Gear(pageID, { slot: spec.slot, item: event.target.value })}
                />
            </span>
            <span className="page3-gear-size">
                {spec.arrow ? (
                    <em className="page3-gear-chrome" data-tooltip-id="my-tooltip" data-tooltip-content="This item's weight is recorded somewhere else (if applicable)."><i className="fa-solid fa-arrow-right-long"></i></em>
                ) : isDefaultSSlot(spec.slot) ? (
                    <em className="page3-gear-label">{cell.size}</em>
                ) : (
                    <input
                        className="character-value"
                        placeholder=" "
                        value={cell.size}
                        onChange={event => updates.updateGearCell(pageID, spec.slot, { size: event.target.value })}
                        onBlur={event => updates.persistPage3Gear(pageID, { slot: spec.slot, size: event.target.value })}
                    />
                )}
            </span>
            <span className="page3-gear-flag">
                <GearFlag
                    checked={cell.staffSnake}
                    onToggle={() => {
                        const staffSnake = !cell.staffSnake
                        updates.updateGearCell(pageID, spec.slot, { staffSnake })
                        updates.persistPage3Gear(pageID, { slot: spec.slot, staffSnake })
                    }}
                />
            </span>
            <span className="page3-gear-flag">
                <GearFlag
                    checked={cell.meditating}
                    onToggle={() => {
                        const meditating = !cell.meditating
                        updates.updateGearCell(pageID, spec.slot, { meditating })
                        updates.persistPage3Gear(pageID, { slot: spec.slot, meditating })
                    }}
                />
            </span>
            <input
                className="character-value page3-gear-w"
                type="number"
                placeholder=" "
                value={cell.w}
                onChange={event => updates.updateGearCell(pageID, spec.slot, { w: numberFromInput(event.target.value) })}
                onBlur={event => updates.persistPage3Gear(pageID, { slot: spec.slot, w: numberFromInput(event.target.value) })}
            />
        </span>
    )
}

function ColumnHead() {
    return (
        <span className="page3-gear-head">
            <strong>Type (Item)</strong>
            <strong>Size</strong>
            <strong data-tooltip-id="my-tooltip" data-tooltip-content="Does this item heal Damage?"><i className="fa-solid fa-staff-snake"></i></strong>
            <strong data-tooltip-id="my-tooltip" data-tooltip-content="Does this item heal Stress?"><img alt="" src={personMeditating} /></strong>
            <strong data-tooltip-id="my-tooltip" data-tooltip-content="Item's Wear">W</strong>
        </span>
    )
}

function persistCoinage(pageID: number, coinage: Page3Coinage, updates: PageType3Updates) {
    updates.persistPage3Coinage(pageID, coinage)
}

export default function Gear({ page, pageID, updates }: Props) {
    const { coinage, notes } = page

    return (
        <div className="page3-gear">
            <h1>Gear</h1>
            <div className="page3-gear-columns">
                <div className="page3-gear-col">
                    <ColumnHead />
                    {LEFT_ROWS.map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <span className="page3-gear-row page3-gear-bar-row">
                        <em className="page3-gear-label">Carry</em>
                    </span>
                    {CARRY_ROWS.map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <span className="page3-gear-row page3-gear-bar-row">
                        <em className="page3-gear-label">Notes</em>
                    </span>
                    <textarea
                        className="character-value page3-notes"
                        placeholder=" "
                        value={notes}
                        onChange={event => updates.updateNotes(pageID, event.target.value)}
                        onBlur={event => updates.persistPage3Notes(pageID, event.target.value)}
                    />
                </div>
                <div className="page3-gear-col">
                    <ColumnHead />
                    <span className="page3-gear-row page3-gear-bar-row">
                        <em className="page3-gear-label">Quarter Mastering</em>
                    </span>
                    {QM_ROWS.map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <span className="page3-gear-row page3-gear-bar-row">
                        <em className="page3-gear-label">Tiny &amp; Other</em>
                    </span>
                    {TINY_ROWS.map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <div className="page3-coinage">
                        <div className="page3-coinage-head">
                            <h2>Coinage</h2>
                            <h2 className="minor-heading">Size</h2>
                            <h2 className="minor-heading">100 coins = 1s</h2>
                        </div>
                        <span>
                            <em>cc</em>
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={coinage.copper}
                                onChange={event => updates.updateCoinage(pageID, { copper: event.target.value === '' ? 0 : +event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, copper: event.target.value === '' ? 0 : +event.target.value }, updates)}
                            />
                            <p className="character-value">{coinSizeText(coinage.copper)}</p>
                            <em></em>
                        </span>
                        <span>
                            <em>sc</em>
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={coinage.silver}
                                onChange={event => updates.updateCoinage(pageID, { silver: event.target.value === '' ? 0 : +event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, silver: event.target.value === '' ? 0 : +event.target.value }, updates)}
                            />
                            <p className="character-value">{coinSizeText(coinage.silver)}</p>
                            <em>x100 cc</em>
                        </span>
                        <span>
                            <em>gc</em>
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={coinage.gold}
                                onChange={event => updates.updateCoinage(pageID, { gold: event.target.value === '' ? 0 : +event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, gold: event.target.value === '' ? 0 : +event.target.value }, updates)}
                            />
                            <p className="character-value">{coinSizeText(coinage.gold)}</p>
                            <em>x100 sc</em>
                        </span>
                        <span>
                            <em>pc</em>
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={coinage.platinum}
                                onChange={event => updates.updateCoinage(pageID, { platinum: event.target.value === '' ? 0 : +event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, platinum: event.target.value === '' ? 0 : +event.target.value }, updates)}
                            />
                            <p className="character-value">{coinSizeText(coinage.platinum)}</p>
                            <em>x100 gc</em>
                        </span>
                    </div>
                </div>
                <div className="page3-gear-col">
                    <ColumnHead />
                    {CONTAINER_ROWS.map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    {OTHER_ROWS.map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <p className="page3-footnote">* Item is recorded in either clothing or other containers</p>
                </div>
            </div>
        </div>
    )
}
