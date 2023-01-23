const { db } = require('../../../../utils/db');
const md5 = require('md5');

async function createSensor(sensor, settings) {
    let mac = md5(station.mac + Date.now().toString());

    sensor.mac = mac;

    let created_sensor = await db.sensor.create({
        data: sensor,
    });

    settings.sensorId = created_sensor.id;

    let created_settings = await db.sensorSettings.create({
        data: settings,
    });

    return {created_sensor, created_settings, mac};
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