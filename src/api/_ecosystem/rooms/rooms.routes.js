const router = require('express').Router();

const rooms = require('./rooms.controller');

router.post('/', rooms.createNewRoom);
router.put('/', rooms.updateRoom);
router.delete('/', rooms.deleteRoom);
router.get('/', rooms.getUsersRooms);

module.exports = router