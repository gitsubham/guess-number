import { RouterStore } from 'mobx-react-router'

import RoutingModel from './RoutingModel'
import AuthenticateModel from './AuthenticateModel'

export const stores = {
  authenticateModel: new AuthenticateModel(),
  internalRoutingModel: new RoutingModel(),
  routing: new RouterStore(),
}
