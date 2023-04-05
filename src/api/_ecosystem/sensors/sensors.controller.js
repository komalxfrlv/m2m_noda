const sensorValidator = require('./sensors.validators');
const currentUser = require('../../../utils/getUser')
const {
    createSensor,
    findSensorById,
} = require('./sensors.services');
const {
    findStationById
} = require('../stations/stations.services')

async function createNewSensor(req, res, next) {
    try {
        let newSensor = req.body.sensor;
        let newSettings = req.body.settings;
        let stationId = req.body.stationId;

        const { userId } = req.payload

        const station = await findStationById(stationId)
        console.log(station.userId)
        if ((station.id !== stationId) || (station.userId !== userId)) {
            res.status(400);
            throw new Error('Not your station. ');
        }

        if (await sensorValidator.sensorCreating(newSensor)) {
            res.status(400);
            console.log(newSensor)
            throw new Error('You must provide all fields of sensor.');
        }
        
 if (await sensorValidator.settingsCreating(newSettings)) {
            res.status(400);
            console.log(newSettings)
            throw new Error('You must provide all fields of settings.');
        }       

        let a = await createSensor(newSensor, newSettings, stationId);
        
        console.log(a);

        res.json(a);
    } catch (err) {
        next(err);
    }
}


async function getSensorById(req, res, next) {
    try{
    const sensorId = req.params.id
    console.log(sensorId)
    const sensor = await findSensorById(sensorId)

    
    if(!sensor){
        res.status(400);
        console.log(sensor)
        throw new Error("Can't find sensor with this mac");
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


module.exports = {
    createNewSensor,
    getSensorById,
}