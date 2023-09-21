const { db } = require('../../../utils/db');

async function findRoomById(id) {
    return await db.rooms.findUnique({
        where: { 
            id:id
        }
    });
}

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
        },
        data: updatedRoom,
    });
}

async function deleteRoom(roomId) {
    return room = await db.rooms.delete({
        where: {
            id: roomId,
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
                include: {
                    sensor: {
                        include: {
                            device: {

                            },
                            data: {
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 1,
                            }
                        }
                    }
                }
            },
            stations: {
                include: {
                    station: {
                        include: {
                            device: {

                            }
                        }
                    }
                }
            }
        }
    });
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllUsersRoom,
    findRoomById
}