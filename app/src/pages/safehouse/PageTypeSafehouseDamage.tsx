import './PageTypeSafehouseDamage.css'
import { useContext } from 'react'
import { SafehousePage2 } from '@vault/common/interfaces/safehouse/safehouse'
import { clampTextareaChange, holdTextareaScroll, isComposingInput, textareaCaps, trimTextarea } from '@vault/common/textareaLimits'
import DoubleColumn from '../v2/pageTypes/components/doubleColumn/DoubleColumn'
import BlankContext, { blankInk } from '../v2/contexts/BlankContext'
import { SafehouseUpdates } from './safehouseHook'

interface Props {
    page: SafehousePage2,
    updates: SafehouseUpdates
}

export default function PageTypeSafehouseDamage({ page, updates }: Props) {
    const isBlank = useContext(BlankContext)

    return (
        <div className="page card page-type-safehouse-damage">
            <DoubleColumn>
                <DamagePane
                    heading="NPCs"
                    field="npcs"
                    value={page.npcs}
                    max={textareaCaps.safehouseNpcs}
                    pageID={page.pageID}
                    isBlank={isBlank}
                    updates={updates}
                />
                <DamagePane
                    heading="Resources"
                    field="resources"
                    value={page.resources}
                    max={textareaCaps.safehouseResources}
                    pageID={page.pageID}
                    isBlank={isBlank}
                    updates={updates}
                />
            </DoubleColumn>
        </div>
    )
}

function DamagePane({
    heading,
    field,
    value,
    max,
    pageID,
    isBlank,
    updates
}: {
    heading: string,
    field: 'npcs' | 'resources',
    value: string,
    max: number,
    pageID: number,
    isBlank: boolean,
    updates: SafehouseUpdates
}) {
    const shown = blankInk(isBlank, value)
    return (
        <div className="safehouse-damage-notes">
            <h1>{heading}</h1>
            <textarea
                className="character-value"
                placeholder=" "
                maxLength={max}
                readOnly={isBlank}
                value={shown}
                onScroll={event => holdTextareaScroll(event.currentTarget)}
                onChange={event => updates.setDamage(pageID, field, clampTextareaChange(event.target.value, max, isComposingInput(event)))}
                onCompositionEnd={event => updates.setDamage(pageID, field, trimTextarea(event.currentTarget.value, max))}
                onBlur={event => updates.blurDamage(pageID, field, trimTextarea(event.currentTarget.value, max))}
            />
        </div>
    )
}
