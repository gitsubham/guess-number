import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import { Authenticated } from '../'
import { Dashboard, Signup, Login } from '../../containers'

export const APP_ROUTE_NAME = 'Home'

export const AppRoutes = props => (
  <Switch>
    <Authenticated exact name={'sign-up'} path={'/signup'} componentRef={Signup} />
    <Authenticated exact name={'login'} path={'/'} componentRef={Login} />
    <Authenticated exact name={'dashboard'} path={'/dashboard'} componentRef={Dashboard} />
  </Switch>
)

AppRoutes.propTypes = {
  name: PropTypes.string.isRequired,
}
