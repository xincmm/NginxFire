import React, { createContext, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Nginx } from './pages'
import { Navbar } from './components'
import './App.less'

const { application } = window
export const AppContext = createContext({})

function App() {
  const [appInfo, setAppInfo] = useState({
    nginx: {
      status: '',
      version: '',
    },
  })

  useEffect(() => {
    setAppInfo(application.getAppInfo())
  }, [])

  return (
    <AppContext.Provider value={appInfo}>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='Main'>
            <Switch>
              <Route path='/nginx'>
                <Nginx />
              </Route>
              <Redirect exact from='/' to='nginx' />
            </Switch>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App
