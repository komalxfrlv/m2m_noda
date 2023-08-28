const { db } = require('../../../utils/db');
const { use } = require('./rooms.routes');

async function createRoom(name, userId) {
    return room = await db.rooms.create({
        data: {
            name: name,
            userId: userId
        }
    });
}

async function updateRoom(name, userId, roomId) {
    return room = await db.rooms.update({
        where: {
            id: roomId,
            userId: userId
        },
        data: {
            name: name,
        },
    });
}

async function deleteRoom(userId, roomId) {
    return room = await db.rooms.delete({
        where: {
            id: roomId,
            userId: userId
        }
    });
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom
}