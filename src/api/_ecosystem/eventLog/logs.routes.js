const router = require('express').Router();
const logs = require('./logs.controller');

router.get('/sensor/:sensorId', logs.getBySensor);
router.get('/station/:stationId', logs.getByStation);

module.exports = router