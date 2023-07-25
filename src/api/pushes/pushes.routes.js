const router = require('express').Router();
const pushes = require('./pushes.controller');
const {isAuthenticated} = require('../../middlewares/auth.middleware')
const {
    isAdmin
} = require('../../middlewares/role.middleware')

router.post('/pushToken',isAuthenticated, pushes.sendOnePush)
router.post('/email',isAuthenticated, pushes.sendOnePushByUserEmail)
router.post('/userId',isAuthenticated, pushes.sendOnePushByUserId)
router.post('/myself',isAuthenticated, pushes.sendPushForMyself)
router.post('/all', isAuthenticated, isAdmin, pushes.sendPushForAll)
router.post('/group',isAuthenticated, isAdmin, pushes.sendPushForFroup)


module.exports = router