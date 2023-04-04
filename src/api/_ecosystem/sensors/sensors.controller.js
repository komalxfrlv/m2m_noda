const sensorValidator = require('./sensors.validators');
const currentUser = require('../../../utils/getUser')
const {
    createSensor,
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
        console.log(station)
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

module.exports = {
    createNewSensor,
}