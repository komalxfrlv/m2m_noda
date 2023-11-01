const express = require('express');
const fileUpload = require('express-fileupload');
const createError = require('http-errors');
const morgan = require('morgan');
const router = require('./src/api');
require('dotenv').config();
const https = require('https');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(fileUpload())

const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

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
  //req.payload? console.log(`IP: ${req.ip}\nUserId: ${req.payload.userId}`):console.log(req.payload.logMessage)
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.APP_PORT || 5000;
const HOST = process.env.APP_HOST || "localhost"

const options = {
  key: fs.readFileSync('/etc/nginx/ssl/k-telecom.org.key'),
  cert: fs.readFileSync('/etc/nginx/ssl/k-telecom.org.crt')
};

const server = https.createServer(options, app);
server.listen(PORT, HOST, () => console.log(`🚀 @ http://${HOST}:${PORT}`));
