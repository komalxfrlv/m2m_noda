const router = require('express').Router();
const version = require('./versions.controller');

router.post('/', version.createNewVersion);

module.exports = router