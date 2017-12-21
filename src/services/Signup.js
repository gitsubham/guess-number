import { api } from '../utils'

import { BASE_URL } from '../constants'

const SIGNUP_URL = `${BASE_URL}/signup`

export async function signup({ username, password, cb }) {
  let jsonResponse = {}
  try {
    jsonResponse = await api(SIGNUP_URL, { method: 'POST', body: { username, password } })
    cb(null, jsonResponse)
  }
  catch (e) {
    cb(e)
  }
  return jsonResponse
}
