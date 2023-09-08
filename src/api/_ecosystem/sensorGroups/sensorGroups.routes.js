const router = require('express').Router();
const controller = require('./sensorGroups.controller')
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const {isAdmin} = require("../../../middlewares/role.middleware")


router.get('/', isAuthenticated, controller.getGroups)
router.post('/', isAuthenticated, isAdmin, controller.addGroup)

module.exports = router;