const logsServices = require('./logs.services');

async function getBySensor(req, res, next) {

    const { userId } = req.payload;
    let sensorId = req.body.sensorId;

    try {
        res.json(await logsServices.findAllBySensor(userId, sensorId));
    } catch (error) {
        next(error);
    }
}

async function getByStation(req, res, next) {

    const { userId } = req.payload;
    let stationId = req.body.stationId;

    try {
        res.json(await logsServices.findAllByStation(userId, stationId));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getBySensor,
    getByStation
};