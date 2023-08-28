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

module.exports = {
    createNewRoom
};