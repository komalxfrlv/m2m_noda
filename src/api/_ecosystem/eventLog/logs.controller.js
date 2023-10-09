const logsServices = require('./logs.services');

async function getBySensor(req, res, next) {

    const { userId } = req.payload;
    let sensorId = req.params.sensorId;

    try {
        res.json(await logsServices.findAllBySensor(userId, sensorId));
    } catch (error) {
        next(error);
    }
}

async function getByStation(req, res, next) {

    const { userId } = req.payload;
    let stationId = req.params.stationId;

    try {
        res.json(await logsServices.findAllByStation(userId, stationId));
    } catch (error) {
        next(error);
    }
}

async function postNewLogMessage(req, res, next){
    try{
        res.json(await logsServices.createNewLogMessage(req.body.log))
    }
    catch(err){
        next(err)
    }
}

async function putLogMessage(req, res, next){
    try{
        res.json(await logsServices.updateLogMessage(req.body.log))
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getBySensor,
    getByStation,
    postNewLogMessage,
    putLogMessage
};