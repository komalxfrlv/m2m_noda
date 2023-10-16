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

async function deleteRoom(room, newRoom) {
    await db.sensorSettings.updateMany({
        where:{
            roomsId:room.id
        },
        data:{
            roomsId: newRoom.id
        }
    })
    await db.stationSettings.updateMany({
        where:{
            roomsId:room.id
        },
        data:{
            roomsId: newRoom.id
        }
    })
    return room = await db.rooms.delete({
        where: {
            id: room.id,
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
                            settings:{
                                include:{
                                    icon:true
                                }
                            },
                            device: {
                                include:{
                                    icon:true
                                }
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
            },
        }
    });
}

async function findFirstRoom(userId){
    const firstRoom = await db.rooms.findMany({
        where:{
            userId: userId
        },
        orderBy:{
            createdAt:"asc"
        },
        take:1
    })
    return firstRoom[0] 
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllUsersRoom,
    findRoomById,
    findFirstRoom
}