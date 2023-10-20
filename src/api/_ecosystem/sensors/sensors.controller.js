const {
    validateSensor,
    validateSensorSettings,
} = require('./sensors.validators');
const {findFirstRoom} = require('../rooms/rooms.services')
const {
    createSensor,
    findSensorById,
    updateSettingsById,
    deleteSensorById,
    findDuplicateSensor
} = require('./sensors.services');

const {
    findStationById,
    parseMacDeviceType
} = require('../stations/stations.services')

const { findVersionById,
        findLatestVersionId } = require('../versions/versions.services');
const { findDevicebyId } = require('../devices/devices.services');
const { writeToLog } = require('../../../utils/eventLog')

/*
    SENSOR CONTROLLERS
*/
async function createNewSensor(req, res, next) {
    try {
        let {sensor, settings, stationId} = req.body

        if(! (stationId && sensor && settings) ){
            console.log('there must be sensor, settings and stationId')
            throw new Error('In request must be sensor, settings and stationId. ');
        }
        const { userId } = req.payload
        
        const station = await findStationById(stationId)
        
        if(!station){
            res.status(400);
            console.log(station)
            throw new Error("Can't find station with this id");
        }
        if(await findDuplicateSensor(sensor)){
            throw new Error("This sensor already linked")
        }
        const firstRoom = await findFirstRoom(userId)
        const deviceType = await parseMacDeviceType(sensor.mac)
        const versionId = await findLatestVersionId(deviceType.id)
        sensor.deviceId = deviceType.id
        settings.versionId = versionId
        settings.roomsId = firstRoom.id
        console.log(settings)
        if (station.userId !== userId) { 
            res.status(400);
            throw new Error('Not your station. ');
        }

        //await validateSensor(sensor);
        //await validateSensorSettings(settings);
        
        let a = await createSensor(sensor, settings, stationId);
        
        toLog = {
            userId: userId,
            sensorId: a.id,
            stationId:stationId
        }
        writeToLog(toLog, 0)

        res.json(a);
    } catch (err) {
        next(err);
    }
}

async function getSensorById(req, res, next) {
    try{
    const sensorId = req.query.id
    var withData = req.query.withData == "true" ? true : false
    var withSettings = req.query.withSettings == "true" ? true : false
    //console.log(sensorId, withData, withSettings)
    const sensor = await findSensorById(sensorId, withData, withSettings)

    if(!sensor){
        res.status(400);
        //console.log(sensor)
        throw new Error("Can't find sensor with this id");
    }


    const { userId } = req.payload
    const station = await findStationById(sensor.stationId)


    if (station.userId !== userId){
        res.status(400);
        //console.log(station+" "+userId)
        throw new Error('Not your sensor. ');
    }
    sensor.topic = `${userId}/${station.gatewayId}/${sensor.elementId}`

    res.json(sensor);
    }
    catch(err){
        next(err);
    }
}

async function deleteSensor(req, res, next) {
    try{
    const sensorId = req.body.sensor.id
    const sensor = await findSensorById(sensorId)

    if(!sensor){
        res.status(400);
        //console.log(sensor)
        throw new Error("Can't find sensor with this id");
    }

    const { userId } = req.payload
    const station = await findStationById(sensor.stationId)

    if (station.userId !== userId){
        res.status(400);
        //console.log(`${station.id} ${userId}`)
        throw new Error('Not your sensor. ');
    }
    await deleteSensorById(sensorId);
    res.json(sensor.id);
    }
    catch(err){
        next(err);
    }
}

/*
    SETTINGS CONTROLLERS
*/

async function editSettings(req, res, next) {
    try {
        const sensor = await findSensorById(req.body.sensor.id);
        console.log(sensor.id)
        if(!sensor){
            throw new Error(`Can't find sensor`);
        }
        let newSettings = req.body.settings;
        //console.log(newSettings)
        let a = await updateSettingsById(sensor.id, newSettings);
        //console.log(a);

        res.json(a);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewSensor,
    getSensorById,
    editSettings,
    deleteSensor
}