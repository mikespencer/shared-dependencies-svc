const express = require('express');
const path = require('path');
const logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoConnect = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_URL, (err, client) => {
    if (err) reject(err);
    resolve(client.db('shared-dependencies'));
  });
});

const handleError = err => console.log(err)

app.post('/', (req, res) => {
  mongoConnect().then(db => {
    const { name, version = 'latest' } = req.body;
    const record = { _id: name, version };
    db.collection('dependencies').save(record, (err, result) => {
      if (err) return console.log(err);
      res.json(record);
    });
  }).catch(handleError);
});

app.get('/', (req, res) => {
  mongoConnect().then(db => {
    db
    .collection('dependencies')
    .find()
    .toArray(function(err, results) {
      if (err) return console.log(err);
      res.json(results);
    });
  }).catch(handleError);
});

app.get('/:name', (req, res) => {
  mongoConnect().then(db => {
    db
      .collection('dependencies')
      .find({ _id: req.params.name })
      .toArray(function(err, results) {
        if (err) return console.log(err);
        res.json(results);
      });
  }).catch(handleError);
});

app.delete('/:name', (req, res) => {
  mongoConnect().then(db => {
    const { name } = req.params;
    db.collection('dependencies', (err, collection) => {
      if (err) return console.log(err);
      collection.deleteOne({ _id: name }, (err, collection) => {
        if (err) return console.log(err);
        res.json(`Removed ${name}`);
      });
    });
  }).catch(handleError);
});

app.listen(PORT, () => {
  console.log(`Homepage listening on port ${PORT}`);
});