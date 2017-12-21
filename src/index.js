import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import mobX from 'mobx'

import AppContainer from './containers/AppContainer'
import { stores } from './store'

mobX.useStrict(true)

render(
  <Provider {...stores}>
    <div>
      <AppContainer {...stores} />
    </div>
  </Provider>,
  document.getElementById('root'),
)

window.store = stores
