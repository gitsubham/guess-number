import fetch from 'isomorphic-fetch'

async function fetchResponse(uri, params) {
  try {
    const response = await fetch(uri, params)
    if (response.status === 204) {
      return {}
    }
    if (response.ok) {
      return await response.json()
    }
    const error = new Error()
    error.response = response
    error.status = response.status
    throw error
  }
  catch (err) {
    const error = new Error()
    error.statusCode = err.status
    error.message = err.message
    if (error.message === 'Failed to fetch') {
      error.message = 'Unable to connect to the server.'
    }
    if (err.response) {
      return err.response.json().then(errorBody => {
        error.body = errorBody
        throw error
      })
    }
    throw error
  }
}

export async function api(uri, { headers = {}, method = 'GET', body = {} } = {}) {
  const params = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  }

  if (params.method !== 'GET') {
    params.body = JSON.stringify(body)
  }

  try {
    return fetchResponse(uri, params)
  }
  catch (e) {
    throw e
  }
}
