import { createContext } from 'react'

const BlankContext = createContext(false)

export function blankInk<T extends string | number>(isBlank: boolean, value: T): T | '' {
    return isBlank ? '' : value
}

export default BlankContext
