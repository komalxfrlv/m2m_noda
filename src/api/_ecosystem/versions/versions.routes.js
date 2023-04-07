const router = require('express').Router();
const version = require('./versions.controller');

router.post('/', version.createNewVersion);
router.get('/', version.getAllVersion);

module.exports = router