const router = require('express').Router();
const station = require('./stations.controller');

router.post('/', station.create);

module.exports = router