const router = require('express').Router();
const pushes = require('./pushes.controller');
const {isAuthenticated} = require('../../middlewares/auth.middleware')
const {
    isAdmin
} = require('../../middlewares/role.middleware')

router.post('/pushToken', pushes.sendOnePush)
router.post('/email', pushes.sendOnePushByUserEmail)
router.post('/userId', pushes.sendOnePushByUserId)
router.post('/myself', pushes.sendPushForMyself)
router.post('/all', isAdmin, pushes.sendPushForAll)
router.post('/group', isAdmin, pushes.sendPushForGroup)


router.post('/', isAdmin, pushes.addPush)

router.get('/:code', isAdmin, pushes.getPushByCode)
router.get('/', isAdmin, pushes.getAllPushes)

module.exports = router