import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CharacterVersion1, CharacterVersion2 } from "@vault/common/interfaces/characterInterfaces"

interface State {
    characterCache: CharacterCache
}

export interface CharacterCache {
    1: {
        [key: number]: V1CharacterCacheInfo
    },
    2: {
        [key: number]: V2CharacterCacheInfo
    }
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
        2: {}
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
        }
    }
})

export const { cacheCharacterV1, cacheCharacterV2 } = charactersCacheSlice.actions

export default charactersCacheSlice.reducer