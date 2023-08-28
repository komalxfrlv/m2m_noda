const router = require('express').Router();

const rooms = require('./rooms.controller');

router.post('/', rooms.createNewRoom);

module.exports = router