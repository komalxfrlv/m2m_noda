const router = require('express').Router();
const station = require('./stations.controller');

router.post('/', station.createNewStation);
router.get('/', station.getStationById);
router.put('/settings', station.editSettings);

module.exports = router