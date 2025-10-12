import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import usersCharactersReducer from './slices/usersCharactersSlice'
import charactersCacheSliceReducer from './slices/characterCacheSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    usersCharacters: usersCharactersReducer,
    charactersCache: charactersCacheSliceReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch