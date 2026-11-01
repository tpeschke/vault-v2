import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CharacterHomeInfo } from '@vault/common/interfaces/characterInterfaces'
import { SafehouseHomeInfo } from '@vault/common/interfaces/safehouse/safehouse'

interface State {
    usersCharactersCache: UsersCharacterCache,
    usersSafehousesCache: SafehouseHomeInfo[] | null
}

export type UsersCharacterCache = [
        CharacterHomeInfo[] | null,
        CharacterHomeInfo[] | null
    ] | null

const initialState: State = {
    usersCharactersCache: null,
    usersSafehousesCache: null
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
                        return {
                            ...info,
                            otherPageType1Names: info.otherPageType1Names !== undefined
                                ? info.otherPageType1Names
                                : character.otherPageType1Names
                        }
                    }
                    return character
                })
            }
        },
        cacheSafehouses: (state: State, action: PayloadAction<SafehouseHomeInfo[] | null>) => {
            state.usersSafehousesCache = action.payload
        },
        updateSafehouseCatalogName: (state: State, action: PayloadAction<{ id: number, name: string }>) => {
            if (!state.usersSafehousesCache) {
                return
            }
            state.usersSafehousesCache = state.usersSafehousesCache.map(safehouse => {
                if (safehouse.id !== action.payload.id) {
                    return safehouse
                }
                return { ...safehouse, name: action.payload.name }
            })
        },
        updateSafehouseCatalogInfo: (state: State, action: PayloadAction<{ info: SafehouseHomeInfo }>) => {
            if (!state.usersSafehousesCache) {
                return
            }
            const { info } = action.payload
            state.usersSafehousesCache = state.usersSafehousesCache.map(safehouse => {
                if (safehouse.id !== info.id) {
                    return safehouse
                }
                return {
                    ...info,
                    otherPageType1Names: info.otherPageType1Names !== undefined
                        ? info.otherPageType1Names
                        : safehouse.otherPageType1Names
                }
            })
        }
    }
})

export const { cacheCharacters, updateCatalogInfo, cacheSafehouses, updateSafehouseCatalogName, updateSafehouseCatalogInfo } = usersCharactersSlice.actions

export default usersCharactersSlice.reducer