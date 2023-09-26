const { db } = require('../../../utils/db');

async function findAllByStation(userId, stationId) {
    return await db.station.findMany({
        take: 50,
        where: {
            userId: userId,
            stationId: stationId,
        },
        select: {
            code: {
                
            },
            data: {

            },
            shelldue: {
                
            }
        },
        orderBy: [{
            createdAt:'desc'
        }]
    });
}

async function findAllBySensor(userId, sensorId) {
    return await db.station.findMany({
        take: 50,
        where: {
            userId: userId,
            sensorId: sensorId,
        },
        select: {
            code: {
                
            },
            data: {

            },
            shelldue: {

            }
        },
        orderBy: [{
            createdAt:'desc'
        }]
    });
}



module.exports = {
    findAllByStation,
    findAllBySensor
}