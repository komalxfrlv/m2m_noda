const router = require('express').Router();

const sensor = require('./sensors.controller');

router.post('/', sensor.createNewSensor);
router.get('/:id', sensor.getSensorById);

module.exports = router