import { api } from '../utils'

import { BASE_URL } from '../constants'

const LOGIN_URL = `${BASE_URL}/login`
const LOGOUT_URL = `${BASE_URL}/logout`

export async function login({ username, password, cb }) {
  let jsonResponse = {}
  try {
    jsonResponse = await api(LOGIN_URL, { method: 'POST', body: { username, password } })
    cb(null, jsonResponse)
  }
  catch (e) {
    cb(e)
  }
  return jsonResponse
}

export async function logOut({ token, cb }) {
  let jsonResponse = {}
  try {
    jsonResponse = await api(LOGOUT_URL, { method: 'DELETE', body: { token } })
    cb(null, jsonResponse)
  }
  catch (e) {
    cb(e)
  }
  return jsonResponse
}
