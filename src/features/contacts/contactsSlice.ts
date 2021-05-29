import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { readFromLocalStorage } from 'utils/readFromLocalStorage'

export interface Contact {
  id: number
  name: string
  lastname: string
  age: number
  pager: number
}

export type ContactState = Contact[]
export type ContactInput = Omit<Contact, 'id'>

const persistedState = readFromLocalStorage()
const initialState: ContactState = persistedState ? persistedState.contacts : []

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setContacts: (_, action: PayloadAction<ContactState>) => action.payload,
    addContact: (state, action: PayloadAction<Contact>) => [
      ...state,
      action.payload,
    ],
    editContact: (state, action: PayloadAction<Contact>) =>
      state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      ),
    removeContact: (state, action: PayloadAction<number>) =>
      state.filter(({ id }) => id !== action.payload),
  },
})

export const contactsSelector = (state: RootState) => state.contacts

export const { addContact, editContact, removeContact, setContacts } =
  contactsSlice.actions

export default contactsSlice.reducer
