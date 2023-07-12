const express = require('express');
const fileUpload = require('express-fileupload');
const createError = require('http-errors');
const morgan = require('morgan');
const router = require('./src/api');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(fileUpload())

BigInt.prototype.toJSON = function() {       
  return this.toString()
}

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./src/api'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.APP_PORT || 5000;
const HOST = process.env.APP_HOST || "localhost"
app.listen(PORT, HOST, () => console.log(`🚀 @ http://${HOST}:${PORT}`));
