const express = require('express');
const logger = require('morgan');
const HttpStatus = require('http-status-codes');

const {
  dbConnect,
  saveDependency,
  getDependencies,
  deleteDependency,
} = require('./db');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleDBError = err => console.log(err);

const respondWithError = (res, status) => {
  res.status(status).json({
    status,
    error: HttpStatus.getStatusText(status),
  });
};

app.post('/', (req, res) => {
  const { name, version = 'latest' } = req.body;
  if (name) {
    dbConnect()
      .then(saveDependency({ _id: name, version }))
      .then(record => {
        res.json(record);
      })
      .catch(handleDBError);
  } else {
    respondWithError(res, HttpStatus.BAD_REQUEST);
  }
});

app.get('/', (req, res) => {
  dbConnect()
    .then(getDependencies())
    .then(results => {
      res.json(results);
    })
    .catch(handleDBError);
});

app.get('/:name', (req, res) => {
  dbConnect()
    .then(getDependencies({ _id: req.params.name }))
    .then(results => {
      res.json(results);
    })
    .catch(handleDBError);
});

app.delete('/:name', (req, res) => {
  dbConnect()
    .then(deleteDependency({ _id: req.params.name }))
    .then(results => {
      res.json({ message: results });
    })
    .catch(handleDBError);
});

app.listen(PORT, () => {
  console.log(`Homepage listening on port ${PORT}`);
});
