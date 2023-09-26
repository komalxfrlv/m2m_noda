const router = require('express').Router();
const logs = require('./logs.controller');

router.get('/sensor', logs.getBySensor);
router.get('/station', logs.getByStation);

module.exports = router