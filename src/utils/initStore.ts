import { AnyAction } from '@reduxjs/toolkit'
import { setContacts } from 'features/contacts/contactsSlice'

const initData = [
  {
    id: 0,
    name: 'John',
    lastname: 'Dorian',
    age: 27,
    pager: 926545,
  },
  {
    id: 1,
    name: 'Carla',
    lastname: 'Espinosa',
    age: 28,
    pager: 945455,
  },
  {
    id: 2,
    name: 'Perry',
    lastname: 'Cox',
    age: 40,
    pager: 955654,
  },
  {
    id: 3,
    name: 'Robert',
    lastname: 'Celso',
    age: 58,
    pager: 128215,
  },
]

export const initStore = (dispatch: (action: AnyAction) => void) => {
  dispatch(setContacts(initData))
}
