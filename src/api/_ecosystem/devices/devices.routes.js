const router = require('express').Router();
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const { getAllDevices } = require('./devices.controller');


router.get('/', isAuthenticated, getAllDevices);

module.exports = router;