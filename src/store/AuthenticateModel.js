import { action, observable } from 'mobx'
import { signup, login, validate, logOut } from '../services/'

export default class Authenticate {
  @observable attempts = localStorage.getItem('attempts') || 3
  @observable token = localStorage.getItem('token') || undefined
  @observable errorMessage = ''
  @observable successMessage = ''

  @action
  setAttempts(attempts) {
    this.attempts = attempts
  }

  @action
  setToken(token) {
    this.token = token
  }

  getAttempts() {
    return this.attempts
  }

  @action
  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage
  }

  getErrorMessage() {
    return this.errorMessage
  }

  @action
  setSuccessMessage(successMessage) {
    this.successMessage = successMessage
  }

  getSuccessMessage() {
    return this.successMessage
  }

  getToken() {
    return this.token
  }
  setInformation(response) {
    if (response.attempts) {
      this.setAttemptsInModelAndStorage(response.attempts)
    }
    if (response.token) {
      localStorage.setItem('token', response.token)
      this.setToken(response.token)
    }
  }

  setAttemptsInModelAndStorage(attempts) {
    localStorage.setItem('attempts', attempts)
    this.setAttempts(attempts)
  }

  @action('login')
  async login({ username, password, cb }) {
    await login({
      username,
      password,
      cb: (err, response) => {
        if (err) {
          const message = !err.body ? err.message : err.body.message
          this.setErrorMessage(message)
        }
        if (response) {
          this.setInformation(response)
          this.setErrorMessage('')
          cb()
        }
      },
    })
  }

  @action('signup')
  async signup({ username, password }) {
    await signup({
      username,
      password,
      cb: (err, response) => {
        if (err) {
          const message = !err.body ? err.message : err.body.message
          this.setErrorMessage(message)
          this.setSuccessMessage('')
        }
        else {
          this.setErrorMessage('')
          this.setSuccessMessage('User Created successfully.')
        }
      },
    })
  }

  @action('validate')
  async validate(number, cb) {
    await validate({
      number,
      token: this.getToken(),
      cb: (err, response) => {
        if (err) {
          if (err.body && err.body.code === 'MAX_NUMBER_OF_ATTEMPTS_REACHED') {
            this.setAttempts(0)
            cb()
          }
          const message = !err.body ? err.message : err.body.message
          this.setErrorMessage(message)
          this.setSuccessMessage('')
        }
        else {
          if (response.attempts) {
            this.setAttemptsInModelAndStorage(response.attempts)
          }
          else if (response.success) {
            this.setSuccessMessage('Number validated.')
          }
          this.setErrorMessage('')
        }
      },
    })
  }

  @action('logOut')
  async logOut(cb) {
    await logOut({
      token: this.getToken(),
      cb: (err, res) => {
        if (err) {
          const message = !err.body ? err.message : err.body.message
          this.setErrorMessage(message)
        }
        else {
          localStorage.clear()
          this.setErrorMessage('')
          cb()
        }
      },
    })
  }
}
