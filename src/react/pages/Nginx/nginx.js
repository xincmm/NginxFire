import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Editor, Sidebar } from './components'
import NewServer from '../NewServer/newServer'

const Nginx = () => {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path='/nginx' exact>
          <Editor />
        </Route>
        <Route path='/nginx/new' exact>
          <NewServer />
        </Route>
      </Switch>
    </>
  )
}

export default Nginx
