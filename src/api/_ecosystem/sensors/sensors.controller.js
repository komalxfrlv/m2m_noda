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
        
        let user = await currentUser.getCurrentUser(req.headers);
        
        let station = findStationById(stationId);

        if ((station.id !== stationId) || (station.userId !== user.id)) {
            res.status(400);
            throw new Error('Not your station');
        }

        if (await sensorValidator.sensorCreating(newSensor)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }
        
        if (await sensorValidator.settingsCreating(newSettings)) {
            res.status(400);
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