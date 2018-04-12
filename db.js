const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const dbConnect = (url = MONGODB_URI) =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) reject(err);
      resolve(client.db('shared-dependencies'));
    });
  });

const saveDependency = record => db =>
  new Promise((resolve, reject) =>
    db.collection('dependencies').save(record, (err, result) => {
      if (err) reject(err);
      resolve(record);
    })
  );

const getDependencies = (query = {}) => db =>
  new Promise((resolve, reject) => {
    db
      .collection('dependencies')
      .find(query)
      .toArray(function(err, results) {
        if (err) reject(err);
        resolve(results);
      });
  });

const deleteDependency = query => db =>
  new Promise((resolve, reject) => {
    db.collection('dependencies').deleteOne(query, (err, collection) => {
      if (err) reject(err);
      resolve(`Removed ${query._id}`);
    });
  });

module.exports = {
  dbConnect,
  saveDependency,
  getDependencies,
  deleteDependency,
};
