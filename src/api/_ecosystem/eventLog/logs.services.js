const { db } = require('../../../utils/db');

async function findAllByStation(userId, stationId) {
    return await db.eventLog.findMany({
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
    return await db.eventLog.findMany({
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

async function createNewLogMessage(log){
    return await db.eventCode.create({
        data:log
    })
}

async function updateLogMessage(log){
    return await db.eventCode.update({
        where:{
            id:log.id
        },
        data:log
    })
}

module.exports = {
    findAllByStation,
    findAllBySensor,
    createNewLogMessage,
    updateLogMessage
}