const { validateDataCreating,
        validateSensorUpdating} = require('./data.validators');
const { createData,
        getDataInterval,
        updateLastData,
        getDataTest } = require('./data.services');
const { updateSensorById,
        findSensorById } = require('../sensors/sensors.services');

const { findStationById } = require('../stations/stations.services');
const { findUserById} = require('../../users/users.services')
const {
    getMainServerTime
} = require('../../../utils/time.js');
const { sendPushRequest,
        getPushFromDBByCode } = require('../../pushes/pushes.services')

async function create(req, res, next) {
    try {
        const data = req.body.data
        const sensorFromData = req.body.sensor  
        console.log(`${JSON.stringify(data)}\n${JSON.stringify(sensorFromData)}\n\n`)

        await validateDataCreating(data)
        await validateSensorUpdating(sensorFromData)

        data.sensorId = req.body.sensor.id 
        //data.createdAt = await getMainServerTime()
        
        await updateSensorById(sensorFromData)
        const sensor = await findSensorById(sensorFromData.id, false, true)
        const user = await findUserById(req.payload.userId)

        if(req.body.data.value.changed){
            const title = `Активность датчика засора`
            const content = `Датчик засора зафиксировал ${req.body.data.value.measurement}% заполнения трубы`
            sendPushRequest(user.token, title, content)
            await createData(data)
        }
        else{
            updateLastData(data)
        }


        const options = sensor.settings.options
        const measurement = req.body.data.value.measurement
        const units = req.body.data.value.units
        const measurementTime = req.body.data.value.time //в секундах
        if (options[measurement] & options[measurement] < measurementTime){
            const title = sensor.settings.name
            const content = `значение ${measurement}${units} сохраняется в течении ${Math.floor(measurementTime/60)} минут`
            sendPushRequest(user.token, title, content)
        }

        res.json(data);

    } catch (err) {
        next(err);
    }
}

async function getInterval(req, res, next) {
    try {
        const {dateFrom, dateTo, sensorId} = req.query
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

async function formPushMessage(code, name, value, units, time){
    //code-код пуша из дб. name-имя датчика. value-значение датчика units-ед. изм
    let push = await getPushFromDBByCode(code)
    if (push){
        switch (code) {
            case 1337:        
            break;
        }
        return push
    } 
    else{
        const push = {
            title: name,
            content: `Датчик фиксирует ${value}${units} на протяжении ${time/60} минут. Возможно вам стоит проверить его`
        }
        return push
    }
}

async function getTest(req, res, next) {
    try {
        const {dateFrom, dateTo, sensorId} = req.query

        let allData = await getDataTest(dateFrom, dateTo, sensorId);



        res.json(allData);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    getInterval,
    getTest
}