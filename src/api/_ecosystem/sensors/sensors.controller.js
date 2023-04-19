const {
    validateSensor,
    validateSensorSettings,
} = require('./sensors.validators');

const {
    createSensor,
    findSensorById,
    updateSettingsById,
    deleteSensorById,
} = require('./sensors.services');

const {
    findStationById
} = require('../stations/stations.services')




/*
    SENSOR CONTROLLERS
*/
async function createNewSensor(req, res, next) {
    try {
        let newSensor = req.body.sensor;
        let newSettings = req.body.settings;
        let stationId = req.body.stationId;

        if(! (stationId && newSensor && newSettings) ){
            console.log(`sensor: \n${newSensor}\n\n settings:\n ${newSettings}\n\n stationId: \n${stationId}\n\n`)
            throw new Error('In request must be sensor, settings and stationId. ');
        }
        const { userId } = req.payload

        const station = await findStationById(stationId)
        
        if(!station){
            res.status(400);
            console.log(station)
            throw new Error("Can't find station with this id");
        }
        //console.log(station.userId)
        if (station.userId !== userId) { 
            res.status(400);
            throw new Error('Not your station. ');
        }
        await validateSensor(newSensor);
        await validateSensorSettings(newSettings);
        
        let a = await createSensor(newSensor, newSettings, stationId);
        
        console.log(a);

        res.json(a);
    } catch (err) {
        next(err);
    }
}

async function getSensorById(req, res, next) {
    try{
    const sensorId = req.query.id
    console.log(sensorId)
    const sensor = await findSensorById(sensorId)

    if(!sensor){
        res.status(400);
        console.log(sensor)
        throw new Error("Can't find sensor with this id");
    }


    const { userId } = req.payload
    const station = await findStationById(sensor.stationId)


    if (station.userId !== userId){
        res.status(400);
        console.log(station+" "+userId)
        throw new Error('Not your sensor. ');
    }


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
        console.log(sensor)
        throw new Error("Can't find sensor with this id");
    }

    const { userId } = req.payload
    const station = await findStationById(sensor.stationId)

    if (station.userId !== userId){
        res.status(400);
        console.log(`${station} ${userId}`)
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
        console.log(newSettings)
        let a = await updateSettingsById(sensor.id, newSettings);
        console.log(a);

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