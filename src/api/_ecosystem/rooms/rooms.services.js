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

async function updateRoom(updatedRoom, userId, roomId) {
    return room = await db.rooms.update({
        where: {
            id: roomId,
            userId: userId
        },
        data: updatedRoom,
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

async function getAllUsersRoom(userId) {
    return room = await db.rooms.findMany({
        where: {
            userId: userId
        },
        include: {
            sensors: {

            },
            stations: {

            }
        }
    });
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllUsersRoom
}