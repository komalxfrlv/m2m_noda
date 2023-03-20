const { db } = require('../../../utils/db');

async function createSensor(sensor, settings, stationId) {
    
    sensor.stationId = stationId;

    let created_sensor = await db.sensor.create({
        data: sensor,
    });

    settings.sensorId = created_sensor.id;

    let sensor_id = created_sensor.id

    let created_settings = await db.sensorSettings.create({
        data: settings,
    });

    return { sensor_id, created_sensor, created_settings };
}

async function findSensorById(id) {
    return await db.sensor.findUnique({
        where: { 
            id,
        },
    });
}

async function updateSensorById(id, sensor) {
    return await db.sensor.update({
        where: {
            id,
        },
        data: sensor,
    });
}

async function deleteSensorById(id) {
    return await db.sensor.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    createSensor,
    findSensorById,
    updateSensorById,
    deleteSensorById,
}