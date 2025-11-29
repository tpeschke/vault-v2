import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CharacterHomeInfo } from '@vault/common/interfaces/characterInterfaces'

interface State {
    usersCharactersCache: UsersCharacterCache
}

export type UsersCharacterCache = [
        CharacterHomeInfo[] | null,
        CharacterHomeInfo[] | null
    ] | null

const initialState: State = {
    usersCharactersCache: null
}

export const usersCharactersSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {
        cacheCharacters: (state: State, action: PayloadAction<UsersCharacterCache>) => {
            const { payload } = action
            state.usersCharactersCache = payload
        },
        updateCatalogInfo: (state: State, action: PayloadAction<{info: CharacterHomeInfo, index: 0 | 1}>) => {
            const { info, index } = action.payload
            if (state.usersCharactersCache && state.usersCharactersCache[index]) {
                state.usersCharactersCache[index] = state.usersCharactersCache[index].map(character => {
                    if (character.id === info.id) {
                        return info
                    }
                    return character
                })
            }
        }
    }
})

export const { cacheCharacters, updateCatalogInfo } = usersCharactersSlice.actions

export default usersCharactersSlice.reducer