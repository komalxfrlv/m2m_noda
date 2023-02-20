const router = require('express').Router();

const sensor = require('./sensors.controller');

router.post('/', sensor.createNewSensor);

module.exports = router