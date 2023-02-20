const router = require('express').Router();
const pushes = require('./pushes.controller');

router.get('/test-push', pushes.testingPushes)

module.exports = router