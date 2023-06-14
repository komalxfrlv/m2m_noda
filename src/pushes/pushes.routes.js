const router = require('express').Router();
const pushes = require('./pushes.controller');

router.post('/', pushes.Pushes)

module.exports = router