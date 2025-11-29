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
        ignoredActions: ['chapter/cacheCharacterV1', 'chapter/cacheCharacterV2'],
        ignoredPaths: ['charactersCache']
      },
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch