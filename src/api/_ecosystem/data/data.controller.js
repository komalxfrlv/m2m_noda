const {validateDataCreating,
        validateSensorUpdating} = require('./data.validators');
const { createData } = require('./data.services');
const { updateSensorById } = require('../sensors/sensors.services');

async function create(req, res, next) {
    try {
        const data = req.body.data
        const sensor = req.body.sensor  
        console.log(`${JSON.stringify(data)}\n${JSON.stringify(sensor)}\n\n`)
        /*
        if (! await dataValidator.dataCreating(data)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }
        */
        await validateDataCreating(data)
        await validateSensorUpdating(sensor)
        data.sensorId = req.body.sensor.id 
        await updateSensorById(sensor)
        res.json(await createData(data));

    } catch (err) {
        next(err);
    }
}

exports.create = create;