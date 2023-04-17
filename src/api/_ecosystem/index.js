const router = require('express').Router();

const metrics = require('./metrics/metrics.routes');
const cities = require('./cities/cities.routes');
const devices = require('./devices/devices.routes');
const versions = require('./versions/versions.routes');
const sensors = require('./sensors/sensors.routes');
const stations = require('./stations/stations.routes');
const data = require('./data/data.routes');

const { isAuthenticated } = require('../../middlewares/auth.middleware');
const {
    isAdmin,
    isManager,
    isDeveloper,
    isSupport
  } = require('../../middlewares/role.middleware');

router.use('/cities', cities);
router.use('/metrics', isAuthenticated, metrics);
router.use('/devices', isAuthenticated, devices);
router.use('/versions', isAuthenticated, isDeveloper, versions);
router.use('/sensors', isAuthenticated, sensors);
router.use('/stations', isAuthenticated, stations);
router.use('/data', data);

module.exports = router;