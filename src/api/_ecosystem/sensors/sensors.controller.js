const {
    validateSensor,
    validateSensorSettings,
} = require('./sensors.validators');

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
        let newSensor = req.body.sensor;
        let newSettings = req.body.settings;
        let stationId = req.body.stationId;

        if(! (stationId && newSensor && newSettings) ){
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
        if(await findDuplicateSensor(newSensor)){
            throw new Error("This sensor already linked")
        }
        const deviceType = await parseMacDeviceType(newSensor.mac)
        const versionId = await findLatestVersionId(deviceType.id)
        newSensor.deviceId = deviceType.id
        newSettings.versionId = versionId

        if (station.userId !== userId) { 
            res.status(400);
            throw new Error('Not your station. ');
        }
        await validateSensor(newSensor);
        await validateSensorSettings(newSettings);
        
        let a = await createSensor(newSensor, newSettings, stationId);
        
        toLog = {
            userId: userId,
            sensorId: a,
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