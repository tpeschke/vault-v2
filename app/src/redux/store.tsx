import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import usersCharactersReducer from './slices/usersCharactersSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    usersCharacters: usersCharactersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch