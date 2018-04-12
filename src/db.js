const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const COLLECTION_NAME = 'dependencies';

const dbConnect = (url = MONGODB_URI) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) reject(err);
      resolve(client.db());
    });
  });

const saveDependency = record => db =>
  new Promise((resolve, reject) =>
    db.collection(COLLECTION_NAME).save(record, (err, result) => {
      if (err) reject(err);
      resolve(record);
    })
  );

const getDependencies = (query = {}) => db =>
  new Promise((resolve, reject) => {
    db
      .collection(COLLECTION_NAME)
      .find(query)
      .toArray(function(err, results) {
        if (err) reject(err);
        resolve(results);
      });
  });

const deleteDependency = query => db =>
  new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME).deleteOne(query, (err, collection) => {
      if (err) reject(err);
      resolve(`Removed ${query._id}`);
    });
  });

module.exports = {
  dbConnect,
  saveDependency,
  getDependencies,
  deleteDependency,
  COLLECTION_NAME,
};
