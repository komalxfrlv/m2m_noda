const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/auth.middleware');
const {
  isAdmin,
  isManager,
  isDeveloper,
  isSupport
} = require('../../middlewares/role.middleware');

const metrics = require('./metrics/metrics.routes');
const cities = require('./cities/cities.routes');
const devices = require('./devices/devices.routes');
const versions = require('./versions/versions.routes');
const sensors = require('./sensors/sensors.routes');
const stations = require('./stations/stations.routes');
const data = require('./data/data.routes');
const userGroups = require("./userGroups/userGroups.routes");
const rooms = require('./rooms/rooms.routes');
const sensorGroups = require('./sensorGroups/sensorGroups.routes')
const eventLog = require('./eventLog/logs.routes')
const icons = require('./icons/icons.routes')
router.use('/cities', cities);
router.use('/metrics', metrics);
router.use('/devices', isAdmin, devices);
router.use('/versions', versions);
router.use('/sensors', sensors);
router.use('/stations', stations);
router.use('/data', data);
router.use('/user-groups', userGroups);
router.use('/rooms', isAuthenticated, rooms);
router.use('/sensor-groups', sensorGroups)
router.use('/eventLog', eventLog)
router.use('/icons', icons)

module.exports = router;