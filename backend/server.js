import express from 'express'
import bodyParser from 'body-parser'

import { connectToDatabase, find, insertOne, updateOne, remove } from './DB'

const ObjectID = require('mongodb').ObjectID
const app = express()
const PORT = 5000
const SECRET_NUMBER = 19
const MAX_NUMBER_OF_ATTEMPTS = 3
const USER = 'user'
const CONNECTIONS = 'connections'

const configureApplication = () => {
  app.use(bodyParser.json())

  app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    if (request.method === 'OPTIONS') {
      response.send(200)
    }
    else {
      next()
    }
  })

  app.post('/login', async (request, response) => {
    const { username, password } = request.body
    const existingUser = await find(USER, { username, password })
    if (existingUser.length === 0) {
      response.status(400)
      sendResponse(response, { message: 'Username/password did not match.' })
      return
    }
    const existingConnection = await find(CONNECTIONS, { username })
    if (existingConnection.length > 0) {
      sendResponse(response, existingConnection[0])
      return
    }
    const result = await insertOne(CONNECTIONS, {
      username,
      token: new ObjectID().toString(),
      attempts: MAX_NUMBER_OF_ATTEMPTS,
    })
    sendResponse(response, result)
  })

  app.delete('/logout', async (request, response) => {
    const { token } = request.body
    const users = await find(CONNECTIONS, { token })
    if (users.length === 0) {
      response.status(400)
      sendResponse(response, { message: 'Invalid token.' })
      return
    }
    const result = await remove(CONNECTIONS, { token })
    sendResponse(response, result)
  })

  app.post('/validateNumber', async (request, response) => {
    const { number, token } = request.body
    if (!number || number.length === 0 || number.length > 2) {
      response.status(400)
      sendResponse(response, { message: 'Number is not in specified range.' })
      return
    }
    const existingUsers = await find(CONNECTIONS, { token })
    if (existingUsers.length === 0) {
      response.status(400)
      sendResponse(response, { message: 'Not authorized.' })
      return
    }
    if (number == SECRET_NUMBER) {
      sendResponse(response, { success: true })
      return
    }
    const existingUser = existingUsers[0]
    if (existingUser.attempts === 1) {
      response.status(400)
      sendResponse(response, { code: 'MAX_NUMBER_OF_ATTEMPTS_REACHED', message: 'Maximum number of attempts reached.' })
      return
    }

    await updateOne(CONNECTIONS, {_id: existingUser._id},
      { $inc: { attempts: -1 } })
    const userInfo = await find(CONNECTIONS, { _id: existingUser._id })
    sendResponse(response, userInfo[0])
  })

  app.post('/signup', async (request, response) => {
    const { username, password } = request.body
    const users = await find(USER, { username })
    if (users.length > 0) {
      response.status(400)
      sendResponse(response, { message: `A user already exists with username: ${username}` })
      return
    }
    const result = await insertOne(USER, { username, password })
    sendResponse(response, result)
  })

  app.listen(PORT, () => {
    console.log(`server started listening on port: ${PORT}`)
  })
}

function sendResponse(response, result) {
  response.json(result)
  response.end()
}

connectToDatabase().then(function () {
  configureApplication()
}).catch(function (err) {
  console.log("Database connection error: " + err)
});
