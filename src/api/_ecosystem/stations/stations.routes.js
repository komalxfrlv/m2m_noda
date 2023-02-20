const router = require('express').Router();
const station = require('./stations.controller');

router.post('/', station.createNewStation);

module.exports = router