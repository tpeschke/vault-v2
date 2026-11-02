import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CharacterVersion1, CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"
import { Safehouse } from "@vault/common/interfaces/safehouse/safehouse"

interface State {
    characterCache: CharacterCache
}

export interface SafehouseCacheInfo {
    id: number,
    safehouseInfo: Promise<Safehouse>
}

export type SafehouseCacheMap = {
    [key: number]: SafehouseCacheInfo
}

export interface CharacterCache {
    1: {
        [key: number]: V1CharacterCacheInfo
    },
    2: {
        [key: number]: V2CharacterCacheInfo
    },
    safehouse: SafehouseCacheMap
}

export interface V1CharacterCacheInfo {
    id: number,
    version: 1,
    characterInfo: Promise<CharacterVersion1>
}

export interface V2CharacterCacheInfo {
    id: number,
    version: 2,
    characterInfo: Promise<CharacterVersion2>
}

const initialState: State = {
    characterCache: {
        1: {},
        2: {},
        safehouse: {}
    }
}

export const charactersCacheSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {
        cacheCharacterV1: (state: State, action: PayloadAction<V1CharacterCacheInfo>) => {
            const { payload } = action
            if (payload.id) {
                state.characterCache[1][payload.id] = payload
            }
        },
        cacheCharacterV2: (state: State, action: PayloadAction<V2CharacterCacheInfo>) => {
            const { payload } = action
            if (payload.id) {
                state.characterCache[2][payload.id] = payload
            }
        },
        cacheSafehouse: (state: State, action: PayloadAction<SafehouseCacheInfo>) => {
            const { payload } = action
            if (payload.id) {
                state.characterCache.safehouse[payload.id] = payload
            }
        }
    }
})

export const { cacheCharacterV1, cacheCharacterV2, cacheSafehouse } = charactersCacheSlice.actions

export default charactersCacheSlice.reducer