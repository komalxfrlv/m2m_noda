const roomsServices = require('./rooms.services');

async function createNewRoom(req, res, next) {
    
    const { userId } = req.payload;

    try {
        const room = await roomsServices.createRoom(req.body.name, userId);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

async function updateRoom(req, res, next) {

    const { userId } = req.payload;

    try {
        const room = await roomsServices.updateRoom(req.body, userId, req.body.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

async function deleteRoom(req, res, next) {

    const { userId } = req.payload;

    try {
        const room = await roomsServices.deleteRoom(userId, req.body.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

async function getUsersRooms(req, res, next) {

    const { userId } = req.payload;

    try {
        const room = await roomsServices.getAllUsersRoom(userId, req.body.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createNewRoom,
    updateRoom,
    deleteRoom,
    getUsersRooms
};