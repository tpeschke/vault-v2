export const TEXTAREA_DEFAULT_MAX = 1350

export const textareaCaps = {
    attackNotes: 150,
    defenseNotes: 150,
    divineRelationship: 500,
    generalSkillNotes: TEXTAREA_DEFAULT_MAX,
    combatSkillNotes: TEXTAREA_DEFAULT_MAX,
    abilities: TEXTAREA_DEFAULT_MAX,
    burdens: TEXTAREA_DEFAULT_MAX,
    page3Contacts: TEXTAREA_DEFAULT_MAX,
    page3Notes: TEXTAREA_DEFAULT_MAX
} as const

const NEWLINE = /\r\n|\r/g

export function textareaCharCount(value: string): number {
    return [...value.replace(NEWLINE, '\n')].length
}

export function trimTextarea(value: string, max: number): string {
    const normalized = value.replace(NEWLINE, '\n')
    const chars = [...normalized]
    if (chars.length <= max) {
        return value
    }
    return chars.slice(0, max).join('')
}

export function clampTextareaChange(value: string, max: number, composing: boolean): string {
    if (composing) {
        return value
    }
    return trimTextarea(value, max)
}

export function isComposingInput(event: { nativeEvent: Event }): boolean {
    return event.nativeEvent instanceof InputEvent && event.nativeEvent.isComposing
}

export function holdTextareaScroll(element: { scrollTop: number, scrollLeft: number }) {
    element.scrollTop = 0
    element.scrollLeft = 0
}

export class TextareaLimitError extends Error {
    constructor() {
        super('Text is too long')
        this.name = 'TextareaLimitError'
    }
}
