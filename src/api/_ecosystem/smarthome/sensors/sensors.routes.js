const router = require('express').Router();
const sensor = require('./sensors.controller');

router.post('/', sensor.create);

module.exports = router