const {validateDataCreating,
        validateSensorUpdating} = require('./data.validators');
const { createData,
    getDataInterval } = require('./data.services');
const { updateSensorById } = require('../sensors/sensors.services');

async function create(req, res, next) {
    try {
        const data = req.body.data
        const sensor = req.body.sensor  
        console.log(`${JSON.stringify(data)}\n${JSON.stringify(sensor)}\n\n`)

        await validateDataCreating(data)
        await validateSensorUpdating(sensor)
        data.sensorId = req.body.sensor.id 
        await updateSensorById(sensor)
        res.json(await createData(data));

    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
}