import React, { useEffect } from 'react'

import { Navbar, Sidebar, Editor } from './components'
import { channels } from '../shared/constants'
import './App.less'

const { ipcRenderer } = window

function App() {
  useEffect(() => {
    if (!ipcRenderer) {
      return
    }
    ipcRenderer.send(channels.APP_INFO)
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO)
    })
  }, [])

  return (
    <div className='App'>
      <Navbar />
      <div className='Main'>
        <Sidebar />
        <Editor />
      </div>
    </div>
  )
}

export default App
