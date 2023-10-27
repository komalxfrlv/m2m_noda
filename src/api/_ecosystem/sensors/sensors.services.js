const { db } = require('../../../utils/db');
const { writeToLog } = require('../../../utils/eventLog');
const { findStationById } = require('../stations/stations.services');



/*
    SENSOR SERVICES
*/
async function createSensor(sensor, settings, stationId) {
    
    sensor.stationId = stationId;

    let created_sensor = await db.sensor.create({
        data: sensor,
    });

    settings.sensorId = created_sensor.id;
    settings.options = {}
    settings.schedule = {}
    await db.sensorSettings.create({
        data: settings,
    });

    return await db.sensor.findUnique({
        where:{
            id: created_sensor.id
        },
        include:{
            settings:{
                include:{
                    icon: true
                }
            },
            device:true,
        }
    });
}

async function findSensorById(id, withData, withSettings) {
    //console.log(id, withData, withSettings)
    return await db.sensor.findUnique({
        where: { 
            id:id
        },
        include: {
            data: withData,
            settings:withSettings
        }
    });
}
async function findSensorByElementId(elementId){
    return await db.sensor.findFirst({
        where:{
            elementId:elementId
        },
        include:{
            settings:true
        }
    })
}
async function findDuplicateSensor(sensor){
    return await db.sensor.findFirst({
        where:{
            stationId: sensor.stationId,
            elementId: sensor.elementId
        }
    })
}

async function updateSensorById(sensor) {
    return await db.sensor.update({
        where: {
            id: sensor.id,
        },
        data: sensor,
    });
}

async function deleteSensorById(id) {
    const sensor = await db.sensor.findUnique({
        where:{
            id:id
        },
        include:{
            settings:true
        }
    }) 
    const station = await findStationById(sensor.stationId)
    toLog = {
        userId: station.userId,
        stationId: station.id,
        sensorName: sensor.settings.name
    }
    writeToLog(toLog, 2)
    return await db.sensor.delete({
        where: {
            id:id,
        },
    });
}


/*
    SETTINGS SERVICES
*/
async function updateSettingsById(sensorId, settings) {
    settings.pushStart ? settings["pushStart"] = new Date(settings.pushStart):""
    settings.pushStart ? settings["pushEnd"] = new Date(settings.pushEnd):""
    let updated_settings = await db.SensorSettings.update({
        where: {
            sensorId: sensorId,
          },
        data: settings
    });
    console.log('done')
    return updated_settings.id;
}



module.exports = {
    createSensor,
    findSensorById,
    updateSensorById,
    deleteSensorById,
    updateSettingsById,
    findDuplicateSensor,
    findSensorByElementId
}