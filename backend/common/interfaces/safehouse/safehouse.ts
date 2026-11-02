export type SafehouseNumber = number | ''

export const SAFEHOUSE_SECTIONS = ['living', 'workspace', 'recreational', 'defenses'] as const

export type SafehouseSection = typeof SAFEHOUSE_SECTIONS[number]

export const SAFEHOUSE_SECTION_CAPS: Record<SafehouseSection, number> = {
    living: 11,
    workspace: 11,
    recreational: 11,
    defenses: 15
}

export const SAFEHOUSE_SHEET_MAX = 15

export const SAFEHOUSE_SHEET_CAP_MESSAGE = 'You can only have 15 pages per safehouse sheet.'

export const SAFEHOUSE_FUNCTION_TEXT_MAX = 500

export const SAFEHOUSE_HEADER_TEXT_MAX = 250

export function isSection(value: unknown): value is SafehouseSection {
    return value === 'living'
        || value === 'workspace'
        || value === 'recreational'
        || value === 'defenses'
}

export function isSafehouseNumber(value: unknown): value is SafehouseNumber {
    return value === '' || (typeof value === 'number' && Number.isFinite(value))
}

export interface SafehouseFunctionRow {
    id: number,
    key?: string,
    name: string,
    rank: SafehouseNumber,
    r: boolean,
    space: SafehouseNumber,
    notes: string
}

export interface SafehouseFunctions {
    living: SafehouseFunctionRow[],
    workspace: SafehouseFunctionRow[],
    recreational: SafehouseFunctionRow[],
    defenses: SafehouseFunctionRow[]
}

export interface SafehousePage1 {
    type: 1,
    pageID: number,
    key?: string,
    name: string,
    location: string,
    cRankLimit: SafehouseNumber,
    wealth: SafehouseNumber,
    spaceLimit: SafehouseNumber,
    wear: SafehouseNumber,
    functions: SafehouseFunctions
}

export interface SafehouseMissingPage {
    type: 404,
    pageID: number
}

export type SafehousePage = SafehousePage1 | SafehouseMissingPage

export interface Safehouse {
    id: number,
    name: string,
    ownsThisSafehouse: boolean,
    pages: SafehousePage[]
}

export interface SafehouseHomeInfo {
    id: number,
    name: string,
    otherPageType1Names: string[]
}

export function emptyFunctions(): SafehouseFunctions {
    return {
        living: [],
        workspace: [],
        recreational: [],
        defenses: []
    }
}

export function emptyPage1(pageID: number, key?: string): SafehousePage1 {
    return {
        type: 1,
        pageID,
        key,
        name: 'New Safehouse',
        location: '',
        cRankLimit: '',
        wealth: '',
        spaceLimit: '',
        wear: '',
        functions: emptyFunctions()
    }
}

export function safehouseTotalRanks(page: SafehousePage1): number {
    let sum = 0
    for (const section of SAFEHOUSE_SECTIONS) {
        for (const row of page.functions[section]) {
            if (typeof row.rank === 'number') {
                sum += row.rank
            }
        }
    }
    return sum
}

export function safehouseRuinCount(page: SafehousePage1): number {
    let count = 0
    for (const section of SAFEHOUSE_SECTIONS) {
        for (const row of page.functions[section]) {
            if (row.r) {
                count += 1
            }
        }
    }
    return count
}

export function safehouseTotalSpace(page: SafehousePage1): number {
    let sum = 0
    for (const section of SAFEHOUSE_SECTIONS) {
        for (const row of page.functions[section]) {
            if (typeof row.space === 'number') {
                sum += row.space
            }
        }
    }
    return sum
}

export function safehouseUpkeep(total: number, ruinCount: number): string {
    if (!Number.isFinite(total)) {
        return '0'
    }
    const negative = total < 0
    const tenths = Math.round((Math.abs(total) / 10) * 10) / 10
    const text = +tenths.toFixed(1).replace(/\.0$/, '') + ruinCount
    if (text === 0) {
        return '0'
    }
    return negative ? `-${text}` : `${text}`
}

export type SafehouseFieldAttribute =
    | 'safehouseFunctionName'
    | 'safehouseFunctionRank'
    | 'safehouseFunctionR'
    | 'safehouseFunctionSpace'
    | 'safehouseFunctionNotes'
    | 'safehouseFunctionInsert'
    | 'safehouseFunctionDelete'
    | 'safehouseWealth'
    | 'safehouseSpaceLimit'
    | 'safehouseWear'

export interface SafehouseFunctionInsertValue {
    section: SafehouseSection,
    name: string,
    rank: SafehouseNumber,
    r: boolean,
    space: SafehouseNumber,
    notes: string
}
