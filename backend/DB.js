import mongodb from 'mongodb'
import { host, port, dbName } from './DBConfig'

const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID
let db = undefined

export const connectToDatabase = () => {
  if (db) {
    return db
  }
  var url = "mongodb://" + host + ":" + port + "/" + dbName;
  return connectToMongo(url).then(function (dbInstance) {
    db = dbInstance
    return db
  })
}

function connectToMongo(url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        reject(err)
        return
      }
      resolve(db)
    })
  })
}

export const insertOne = (table, document) => {
  return new Promise((resolve, reject) => {
    db.collection(table).insertOne(document, function (err, result) {
      if (err) {
        reject(err)
        return
      }
      document._id = result.insertedId
      resolve(document)
    })
  })
}

export const updateOne = (table, query, updates, options = {}) => {
  options.w = 1
  if (query._id) {
    query._id = ObjectId(query._id)
  }
  return new Promise((resolve, reject) => {
    db.collection(table).updateOne(query, updates, options, function (err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

export const find = (table, filter = {}, options = {}) => {
  if (filter._id) {
    filter._id = ObjectId(filter._id)
  }
  return new Promise((resolve, reject) => {
    db.collection(table).find(filter, options).toArray(function (err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

export const remove = (table, query, options = {}) => {
  options.w = 1
  if (query._id) {
    query._id = ObjectId(query._id)
  }
  return new Promise((resolve, reject) => {
    db.collection(table).removeOne(query, options, function (err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}
