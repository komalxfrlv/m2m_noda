const router = require('express').Router();
const pushes = require('./pushes.controller');
const {isAuthenticated} = require('../middlewares/auth.middleware')
const {
    isAdmin
} = require('../middlewares/role.middleware')

router.post('/pushToken', pushes.sendOnePush)
router.post('/email', pushes.sendOnePushByUserEmail)
router.post('/userId', pushes.sendOnePushByUserId)
router.post('/all', isAuthenticated, isAdmin, pushes.sendPushForAll)
router.post('/group',isAuthenticated, isAdmin, pushes.sendPushForFroup)


module.exports = router