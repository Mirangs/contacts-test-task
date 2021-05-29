import { RootState } from 'app/store'

export const saveToLocalStorage = (store: RootState) => {
  try {
    localStorage.setItem('store', JSON.stringify(store))
  } catch (err) {
    console.error(`Error writing to localStorage: ${err}`)
    localStorage.setItem('store', JSON.stringify({}))
  }
}
