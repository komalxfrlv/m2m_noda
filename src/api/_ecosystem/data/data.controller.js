const {validateDataCreating,
        validateSensorUpdating} = require('./data.validators');
const { createData,
        getDataInterval } = require('./data.services');
const { updateSensorById,
        findSensorById } = require('../sensors/sensors.services');

const { findStationById } = require('../stations/stations.services');

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

async function getInterval(req, res, next) {
    try {
        const dateFrom = req.query.dateFrom
        const dateTo = req.query.dateTo
        const sensorId = req.query.sensorId
        if(!(dateFrom && dateTo && sensorId)) throw new Error(`here must be dateFrom, dateTo and sensorId. Check your data`);


        const { userId } = req.payload

        const sensor = await findSensorById(sensorId)
        if(!sensor) throw new Error(`Can't find sensor with this id`); 
        
        const station = await findStationById(sensor.stationId)
        if(!station) throw new Error(`Can't find station with this id`); 
        
        if (userId != station.userId){
            console.log(station)
            console.log(userId)
            throw new Error(`Not your device`);
        }
        let allData = await getDataInterval(dateFrom, dateTo, sensorId)

        res.json(allData);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    getInterval
}