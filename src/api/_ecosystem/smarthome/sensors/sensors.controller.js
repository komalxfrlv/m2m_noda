const sensorValidator = require('./sensors.validators');
const {
    createSensor,
} = require('./sensors.services');

async function create(req, res, next) {
    try {
        let newSensor = req.body.sensor;
        let newSettings = req.body.settings;

        if (await sensorValidator.sensorCreating(newSensor)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }

        if (await sensorValidator.settingsCreating(newSettings)) {
            res.status(400);
            throw new Error('You must provide all fields of settings.');
        }

        let sensor = await createSensor(newSensor, newSettings);
        
        res.json(sensor.mac);
        
    } catch (err) {
        next(err);
    }
}

exports.create = create;