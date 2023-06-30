const router = require('express').Router();
const pushes = require('./pushes.controller');

router.post('/', pushes.sendOnePush)
router.post('/all', pushes.sendPushForAll)
router.post('/group', pushes.sendPushForFroup)


module.exports = router