const router = require('express').Router();
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const device = require('./devices.controller');


router.get('/', isAuthenticated, device.getAllDevices);
router.post('/', isAuthenticated, device.addDevice);
router.put('/', isAuthenticated, device.changeDeviceType);
router.post('/addToGroup', isAuthenticated, device.addDeviceToGroup)

module.exports = router;