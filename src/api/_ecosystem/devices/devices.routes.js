const router = require('express').Router();
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const devices = require('./devices.controller')


router.get('/profile', isAuthenticated, devices.devices);

module.exports = router;