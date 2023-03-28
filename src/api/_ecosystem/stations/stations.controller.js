const stationValidator = require('./stations.validators');
const currentUser = require('../../../utils/getUser');
const {
    createStation,
} = require('./stations.services');

async function createNewStation(req, res, next) {
    try {
        const { userId } = req.payload;

        let newStation = req.body.station;
        let newSettings = req.body.settings;
        
        if (!await stationValidator.stationCreating(newStation)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }
    
        if (!await stationValidator.settingsCreating(newSettings)) {
            res.status(400);
            console.log(newSettings);
            throw new Error('You must provide all fields of settings.');
        }
    
        let station = await createStation(newStation, newSettings, userId);

        res.json(station);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewStation
}