const stationValidator = require('./stations.validators');
const currentUser = require('../../../utils/getUser');
const {
    createStation,
} = require('./stations.services');

async function createNewStation(req, res, next) {
    try {
        
        let newStation = req.body.station;
        let newSettings = req.body.settings;

        let user = currentUser.getCurrentUser(req.headers)

        if (await stationValidator.stationCreating(newStation)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }

        if (await stationValidator.settingsCreating(newSettings)) {
            res.status(400);
            throw new Error('You must provide all fields of settings.');
        }

        let station = await createStation(newStation, newSettings, user);
        
        res.json(station.mac);
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewStation
}