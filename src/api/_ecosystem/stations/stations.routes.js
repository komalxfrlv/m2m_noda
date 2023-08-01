const router = require('express').Router();
const station = require('./stations.controller');

router.post('/', station.createNewStation);
router.get('/', station.getStationById);
router.put('/settings', station.editSettings);
router.delete('/', station.deleteStation);
router.get('/all', station.getAllStations);
router.post('/gateway', station.createGateway)

module.exports = router