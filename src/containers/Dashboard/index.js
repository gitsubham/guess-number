import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('authenticateModel')
@observer
export default class Dashboard extends React.Component {
  static propTypes = {
    authenticateModel: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    number: '',
  }

  onChange = e => {
    this.setState({ number: e.target.value })
  }

  validate = () => {
    const { authenticateModel } = this.props
    authenticateModel.validate(this.state.number, () => {
      setTimeout(() => { this.logOut() }, 2000)
    })
  }

  componentWillUnmount() {
    const { authenticateModel } = this.props
    authenticateModel.setErrorMessage('')
  }

  logOut = () => {
    const { authenticateModel } = this.props
    authenticateModel.logOut(() => {
      this.props.history.push('/')
    })
  }

  render() {
    const { authenticateModel } = this.props
    const errorMessage = authenticateModel.getErrorMessage()
    const successMessage = authenticateModel.getSuccessMessage()

    return (
      <div>
        <div>Enter number between 0 to 99</div>
        <div>No Of Attempts: {authenticateModel.getAttempts()}</div>
        <input type={'text'} maxLength={2} onChange={this.onChange} value={this.state.number} />
        <button onClick={this.validate}>Validate</button>
        <button onClick={this.logOut}>Sign out</button>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
      </div>
    )
  }
}
