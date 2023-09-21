const { error } = require('ajv/dist/vocabularies/applicator/dependencies');
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
        const room = await roomsServices.findRoomById(req.body.id);
        if (room.userId !== userId) {
            throw new Error("not your room")
        }
        res.json( await roomsServices.updateRoom(req.body, userId, req.body.id));
    } catch (error) {
        next(error);
    }
}

async function deleteRoom(req, res, next) {

    const { userId } = req.payload;

    try {
        const room = await roomsServices.findRoomById(req.params.id);
        if (room.userId === userId) {
            await roomsServices.deleteRoom(req.params.id);
        } else {
            throw new Error("not your room")
        }
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

async function getUsersRooms(req, res, next) {

    const { userId } = req.payload;

    try {
        res.json(await roomsServices.getAllUsersRoom(userId));
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