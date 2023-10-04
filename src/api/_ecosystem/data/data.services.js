const { db } = require('../../../utils/db');

async function createData(data) {
    return await db.data.create({
        data: data
    });
}

async function getDataInterval(dateFrom, dateTo, sensorId) {
    /*return await db.data.findMany({
        take: 50,
        distinct: ['value'],
        where: {
            createdAt:{
                gte: dateFrom,
                lte: dateTo
            },
            sensorId: sensorId
        },
        orderBy: [{
            createdAt:'desc'
        }]
    });//*/
    return await db.data.findMany({
        where: {
            createdAt: {
                gte: dateFrom,
                lte: dateTo
            },
            sensorId: sensorId
        },
        orderBy: [{
            createdAt: 'desc'
        }],
        take: 1000
    })
}

async function updateLastData(data) {
    const lastData = await db.data.findFirst({
        where: {
            sensorId: data.sensorId
        },
        orderBy: [{
            createdAt: "desc"
        }]
    })
    const now = new Date()
    now.setHours(now.getHours() + 5)
    return await db.data.update({
        where: {
            id: lastData.id
        },
        data: {
            updatedAt: now.toISOString()
        }
    })
}

async function findLongInterval(dateFrom, dateTo, sensorId, key) {
    return await db.$queryRaw`
    SELECT "createdAtDate", AVG(CAST(value->>${key} AS DECIMAL)) AS average
    FROM "Data"
    where "sensorId" = ${sensorId}
    GROUP BY DATE("createdAtDate")
  `;  
  }
  

module.exports = {
    createData,
    getDataInterval,
    updateLastData,
    findLongInterval
}