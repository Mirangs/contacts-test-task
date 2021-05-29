import React, { useEffect } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import Contacts from 'features/contacts/Contacts'
import { readFromLocalStorage } from 'utils/readFromLocalStorage'
import { initStore } from 'utils/initStore'
import { useAppDispatch } from 'app/hooks'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const persistentStorage = readFromLocalStorage()
    if (!persistentStorage || !persistentStorage.contacts.length) {
      initStore(dispatch)
    }
  }, [dispatch])

  return (
    <div className="App">
      <Contacts />
    </div>
  )
}

export default App
