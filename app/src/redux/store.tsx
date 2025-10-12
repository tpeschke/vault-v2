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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['chapter/cacheCharacter'],
        ignoredPaths: ['charactersCache.characterCache']
      },
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch