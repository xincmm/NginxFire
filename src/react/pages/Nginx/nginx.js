import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Editor, Sidebar } from './components'
import NewNginx from '../NewNginx/newNginx'

const Nginx = () => {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path='/nginx' exact>
          <Editor />
        </Route>
        <Route path='/nginx/new' exact>
          <NewNginx />
        </Route>
      </Switch>
    </>
  )
}

export default Nginx
