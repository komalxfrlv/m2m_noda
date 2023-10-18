const router = require('express').Router();
const logs = require('./logs.controller');
const {isAdmin} = require('../../../middlewares/role.middleware')

router.get('/', isAdmin, logs.getAllLogs);
router.get('/code', isAdmin, logs.getAllLogCodes);
router.get('/user/:userId', isAdmin, logs.getAnyUserLogs);

router.get('/user', logs.getAllUserLogs);
router.get('/sensor/:sensorId', logs.getBySensor);
router.get('/station/:stationId', logs.getByStation);

router.post('/', logs.postNewLogMessage);
router.put('/', logs.putLogMessage);
module.exports = router