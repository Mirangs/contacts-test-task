import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import contactsReducer from 'features/contacts/contactsSlice'
import { saveToLocalStorage } from 'utils/saveToLocalStorage'

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
})

store.subscribe(() => {
  saveToLocalStorage({
    contacts: store.getState().contacts,
  })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
