const router = require('express').Router();
const data = require('./data.controller');

router.post('/', data.create);

module.exports = router;