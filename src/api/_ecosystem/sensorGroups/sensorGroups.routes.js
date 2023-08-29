const router = require('express').Router();
const controller = require('./sensorGroups.controller')
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const {isAdmin} = require("../../../middlewares/role.middleware")


router.get('/',     isAuthenticated,    isAdmin,    controller.getGroups)
router.post('/',    isAuthenticated,    isAdmin,    controller.addGroup)
router.put('/',     isAuthenticated,    isAdmin,    controller.postSensorToGroup)

module.exports = router;