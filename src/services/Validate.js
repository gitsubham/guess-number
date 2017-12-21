import { api } from '../utils'

import { BASE_URL } from '../constants'

const VALIDATE_NUMBER_URL = `${BASE_URL}/validateNumber`

export async function validate({ number, token, cb }) {
  let jsonResponse = {}
  try {
    jsonResponse = await api(VALIDATE_NUMBER_URL, { method: 'POST', body: { number, token } })
    cb(null, jsonResponse)
  }
  catch (e) {
    cb(e)
  }
  return jsonResponse
}
