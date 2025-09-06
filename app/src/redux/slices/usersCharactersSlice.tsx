import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CharacterHomeInfo } from '@vault/common/interfaces/characterInterfaces'

interface State {
    usersCharactersCache: CharacterHomeInfo[] | null
}

const initialState: State = {
    usersCharactersCache: null
}

export const usersCharactersSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {
        cacheCharacters: (state: State, action: PayloadAction<CharacterHomeInfo[] | null>) => {
            const { payload } = action
            state.usersCharactersCache = payload
        }
    },
})

export const { cacheCharacters } = usersCharactersSlice.actions

export default usersCharactersSlice.reducer