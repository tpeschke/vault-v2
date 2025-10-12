import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces"

interface State {
    characterCache: {
        [key: number]: CharacterCacheInfo
    }
}

export interface CharacterCacheInfo {
    id: number
    characterInfo: Promise<CharacterVersion1>
}

const initialState: State = {
    characterCache: {}
}

export const charactersCacheSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {
        cacheCharacter: (state: State, action: PayloadAction<CharacterCacheInfo>) => {
            const { payload } = action
            if (payload.id) {
                state.characterCache[payload.id] = payload
            }
        }
    }
})

export const { cacheCharacter } = charactersCacheSlice.actions

export default charactersCacheSlice.reducer