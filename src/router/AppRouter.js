import React from 'react'
import { Switch } from 'react-router-dom'

import { Authenticated } from './'
import { AppRoutes, APP_ROUTE_NAME } from './plugins'

const AppRouter = props => (
  <div>
    <Switch>
      <Authenticated
        path="/"
        name={APP_ROUTE_NAME}
        componentRef={AppRoutes}
      />
    </Switch>
  </div>
)

export default AppRouter
