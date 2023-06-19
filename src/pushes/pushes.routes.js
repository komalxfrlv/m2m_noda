const router = require('express').Router();
const pushes = require('./pushes.controller');

router.post('/', pushes.sendOnePush)
router.post('/all', pushes.sendPushForAll)


module.exports = router