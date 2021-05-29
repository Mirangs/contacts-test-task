import { RootState } from 'app/store'

export const readFromLocalStorage = (): RootState | null => {
  try {
    return JSON.parse(localStorage.getItem('store') || '')
  } catch (err) {
    console.error(`Error reading from localStorage: ${err}`)
    return null
  }
}
