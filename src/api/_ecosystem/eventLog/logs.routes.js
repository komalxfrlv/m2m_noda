const router = require('express').Router();
const logs = require('./logs.controller');

router.post('/sensor', logs.getBySensor);
router.post('/station', logs.getByStation);

module.exports = router