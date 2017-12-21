import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('authenticateModel')
@observer
export default class Login extends React.Component {
  static propTypes = {
    authenticateModel: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
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

  onLogin = () => {
    this.props.authenticateModel.login({
      username: this.state.username,
      password: this.state.password,
      cb: () => {
        this.props.history.push('/dashboard')
      },
    })
  }

  redirectToSignUp = () => {
    this.props.history.push('/signup')
  }

  componentWillUnmount() {
    const { authenticateModel } = this.props
    authenticateModel.setErrorMessage('')
  }

  render() {
    const { authenticateModel } = this.props
    const errorMessage = authenticateModel.getErrorMessage()
    return (
      <div>
        <input type={'text'} placeholder={'Username'} onChange={this.onNameChange} value={this.state.username} />
        <input
          type={'password'}
          placeholder={'Password'}
          onChange={this.onPasswordChange}
          value={this.state.password}
        />
        <button onClick={this.onLogin}>Login</button>
        <button onClick={this.redirectToSignUp}>Sign Up</button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}
