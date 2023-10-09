const router = require('express').Router();
const logs = require('./logs.controller');

router.get('/sensor/:sensorId', logs.getBySensor);
router.get('/station/:stationId', logs.getByStation);

router.post('/', logs.postNewLogMessage);
router.put('/', logs.putLogMessage);
module.exports = router