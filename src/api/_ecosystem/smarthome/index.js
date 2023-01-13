const router = require('express').Router();

const sensors = require('./sensors/sensors.routes');
const stations = require('./stations/stations.routes');

router.use('/sensors', sensors);
router.use('/stations', stations);

module.exports = router;