const { db } = require('../../../../utils/db');

async function create(sensor, settings) {
    let created_sensor = await db.sensor.create({
        data: sensor,
    });

    settings.sensor = created_sensor;

    let created_settings = await db.sensorSettings.create({
        data: settings,
    });

    return {created_sensor, created_settings};
}

async function findById(id) {
    return await db.sensor.findUnique({
        where: { 
            id,
        },
    });
}

async function updateById(id, sensor) {
    return await db.sensor.update({
        where: {
            id,
        },
        data: sensor,
    });
}

async function deleteById(id) {
    return await db.sensor.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    create,
    findById,
    updateById,
    deleteById,
}