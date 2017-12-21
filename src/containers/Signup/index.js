import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('authenticateModel')
@observer
export default class Signup extends React.Component {
  static propTypes = {
    authenticateModel: PropTypes.object.isRequired,
  }
  state = {
    username: '',
    password: '',
  }
  onNameChange = e => {
    this.setState({ username: e.target.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onSignup = () => {
    this.props.authenticateModel.signup(this.state)
  }

  redirectToLogin = () => {
    this.props.history.push('/')
  }

  componentWillUnmount() {
    const { authenticateModel } = this.props
    authenticateModel.setErrorMessage('')
    authenticateModel.setSuccessMessage('')
  }

  render() {
    const { authenticateModel } = this.props
    const errorMessage = authenticateModel.getErrorMessage()
    const successMessage = authenticateModel.getSuccessMessage()
    return (
      <div>
        <input type={'text'} placeholder={'Username'} onChange={this.onNameChange} value={this.state.username} />
        <input
          type={'password'}
          placeholder={'Password'}
          onChange={this.onPasswordChange}
          value={this.state.password}
        />
        <button onClick={this.onSignup}>Signup</button>
        <button onClick={this.redirectToLogin}>Go To Login</button>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
      </div>
    )
  }
}
