import './Gear.css'
import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import {
    Page3Coinage,
    Page3GearSlot
} from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    page: Page3
    pageID: number
    updates: PageType3Updates
}

interface GearRowSpec {
    slot: Page3GearSlot
    label?: string
    arrow?: boolean
    star?: boolean
    bar?: boolean
    carryStr?: string
    qm?: number
}

const LEFT_ROWS: GearRowSpec[] = [
    { slot: 'head', label: 'Head', arrow: true },
    { slot: 'chest', label: 'Chest', arrow: true },
    { slot: 'coat', label: 'Coat', arrow: true },
    { slot: 'gloves', label: 'gloves', arrow: true },
    { slot: 'pants', label: 'pants', arrow: true },
    { slot: 'shoes', label: 'shoes', arrow: true },
    { slot: 'armor', label: 'Armor', arrow: true },
    { slot: 'lHand', label: 'L. Hand', arrow: true },
    { slot: 'rHand', label: 'R. Hand', arrow: true },
    { slot: 'backpack', label: 'Backpack', star: true, bar: true },
    { slot: 'leftS1' }, { slot: 'leftS2' }, { slot: 'leftS3' }, { slot: 'leftS4' }, { slot: 'leftS5' },
    { slot: 'leftS6' }, { slot: 'leftS7' }, { slot: 'leftS8' }, { slot: 'leftS9' },
    { slot: 'pouch1', label: 'Pouch', star: true, bar: true },
    { slot: 'leftS10' }, { slot: 'leftS11' },
    { slot: 'pouch2', label: 'Pouch', star: true, bar: true },
    { slot: 'leftS12' }, { slot: 'leftS13' },
    { slot: 'pouch3', label: 'Pouch', star: true, bar: true },
    { slot: 'leftS14' }, { slot: 'leftS15' }
]

const MIDDLE_ROWS: GearRowSpec[] = [
    { slot: 'heldBag1', label: 'held bag', star: true, bar: true },
    { slot: 'midS1' }, { slot: 'midS2' }, { slot: 'midS3' },
    { slot: 'heldBag2', label: 'held bag', star: true, bar: true },
    { slot: 'midS4' }, { slot: 'midS5' }, { slot: 'midS6' },
    { slot: 'other1', label: 'Other Containers', star: true, bar: true },
    { slot: 'other2', arrow: true },
    { slot: 'other3', arrow: true },
    { slot: 'carryM4', carryStr: '−4 Str' },
    { slot: 'carryM3', carryStr: '−3 Str' },
    { slot: 'carryM2', carryStr: '−2 Str' },
    { slot: 'carryM1', carryStr: '−1 Str' },
    { slot: 'carry0', carryStr: '0 Str' },
    { slot: 'carryP1', carryStr: '1 Str' },
    { slot: 'carryP2', carryStr: '2 Str' },
    { slot: 'carryP3', carryStr: '3 Str' },
    { slot: 'carryP4', carryStr: '4 Str' },
    { slot: 'carryP5', carryStr: '5 Str' }
]

const RIGHT_ROWS: GearRowSpec[] = [
    { slot: 'qm1', qm: 1 }, { slot: 'qm2', qm: 2 }, { slot: 'qm3', qm: 3 }, { slot: 'qm4', qm: 4 }, { slot: 'qm5', qm: 5 },
    { slot: 'qm6', qm: 6 }, { slot: 'qm7', qm: 7 }, { slot: 'qm8', qm: 8 }, { slot: 'qm9', qm: 9 }, { slot: 'qm10', qm: 10 },
    { slot: 'tiny1' }, { slot: 'tiny2' }, { slot: 'tiny3' }, { slot: 'tiny4' }, { slot: 'tiny5' },
    { slot: 'tiny6' }, { slot: 'tiny7' }, { slot: 'tiny8' }, { slot: 'tiny9' }, { slot: 'tiny10' }
]

function numberFromInput(raw: string): SkillNumber {
    return raw === '' ? '' : +raw
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
    const cell = page.gear[spec.slot]
    return (
        <span className={`page3-gear-row${spec.bar ? ' page3-gear-bar-row' : ''}`}>
            <span className="page3-gear-item">
                {spec.label && <em className="page3-gear-label">{spec.label}</em>}
                {spec.arrow && <em className="page3-gear-chrome">{'->'}</em>}
                {spec.star && <em className="page3-gear-chrome">*</em>}
                {spec.carryStr && <em className="page3-gear-label">{spec.carryStr}</em>}
                {spec.qm !== undefined && <em className="page3-gear-label">{spec.qm}</em>}
                <input
                    className="character-value"
                    placeholder=" "
                    value={cell.item}
                    onChange={event => updates.updateGearCell(pageID, spec.slot, { item: event.target.value })}
                    onBlur={event => updates.persistPage3Gear(pageID, { slot: spec.slot, item: event.target.value })}
                />
            </span>
            <input
                className="character-value page3-gear-size"
                placeholder=" "
                value={cell.size}
                onChange={event => updates.updateGearCell(pageID, spec.slot, { size: event.target.value })}
                onBlur={event => updates.persistPage3Gear(pageID, { slot: spec.slot, size: event.target.value })}
            />
            <GearFlag
                checked={cell.staffSnake}
                onToggle={() => {
                    const staffSnake = !cell.staffSnake
                    updates.updateGearCell(pageID, spec.slot, { staffSnake })
                    updates.persistPage3Gear(pageID, { slot: spec.slot, staffSnake })
                }}
            />
            <GearFlag
                checked={cell.meditating}
                onToggle={() => {
                    const meditating = !cell.meditating
                    updates.updateGearCell(pageID, spec.slot, { meditating })
                    updates.persistPage3Gear(pageID, { slot: spec.slot, meditating })
                }}
            />
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
            <strong><i className="fa-solid fa-staff-snake"></i></strong>
            <strong><i className="fa-solid fa-person-meditating"></i></strong>
            <strong>W</strong>
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
                </div>
                <div className="page3-gear-col">
                    <ColumnHead />
                    {MIDDLE_ROWS.slice(0, 11).map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <h2>Carry</h2>
                    {MIDDLE_ROWS.slice(11).map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <h2>Notes</h2>
                    <textarea
                        className="character-value page3-notes"
                        placeholder=" "
                        value={notes}
                        onChange={event => updates.updateNotes(pageID, event.target.value)}
                        onBlur={event => updates.persistPage3Notes(pageID, event.target.value)}
                    />
                    <p className="page3-footnote">* Item is recorded in either clothing or other containers</p>
                </div>
                <div className="page3-gear-col">
                    <ColumnHead />
                    <h2>Quarter Mastering</h2>
                    {RIGHT_ROWS.slice(0, 10).map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <h2>Tiny &amp; Other</h2>
                    {RIGHT_ROWS.slice(10).map(spec => (
                        <GearRow key={spec.slot} spec={spec} page={page} pageID={pageID} updates={updates} />
                    ))}
                    <div className="page3-coinage">
                        <div className="page3-coinage-head">
                            <h2>Coinage</h2>
                            <strong>Size</strong>
                            <em>100 coins = 1s</em>
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
                            <input
                                className="character-value"
                                placeholder=" "
                                value={coinage.copperSize}
                                onChange={event => updates.updateCoinage(pageID, { copperSize: event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, copperSize: event.target.value }, updates)}
                            />
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
                            <input
                                className="character-value"
                                placeholder=" "
                                value={coinage.silverSize}
                                onChange={event => updates.updateCoinage(pageID, { silverSize: event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, silverSize: event.target.value }, updates)}
                            />
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
                            <input
                                className="character-value"
                                placeholder=" "
                                value={coinage.goldSize}
                                onChange={event => updates.updateCoinage(pageID, { goldSize: event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, goldSize: event.target.value }, updates)}
                            />
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
                            <input
                                className="character-value"
                                placeholder=" "
                                value={coinage.platinumSize}
                                onChange={event => updates.updateCoinage(pageID, { platinumSize: event.target.value })}
                                onBlur={event => persistCoinage(pageID, { ...coinage, platinumSize: event.target.value }, updates)}
                            />
                            <em>x100 gc</em>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
