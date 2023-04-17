const router = require('express').Router();
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const { getAllDevices,
        addDevice } = require('./devices.controller');


router.get('/', isAuthenticated, getAllDevices);
router.post('/', isAuthenticated, addDevice);

module.exports = router;