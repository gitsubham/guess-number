import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from '../../router'

export default class AppContainer extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    )
  }
}
