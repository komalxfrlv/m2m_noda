const {
    validateStation,
    validateStationsSettings,
} = require('./stations.validators');
const currentUser = require('../../../utils/getUser');
const {
    createStation,
    findStationById
} = require('./stations.services');

async function createNewStation(req, res, next) {
    try {
        const { userId } = req.payload;

        let newStation = req.body.station;
        let newSettings = req.body.settings;

        if(! (newStation && newSettings) ){
            console.log(`station: \n${newStation}\n\n settings:\n ${newSettings}`)
            throw new Error('In request must be station and settings. ');
        }


        await validateStation(newStation)
        await validateStationsSettings(newSettings)
    
        let station = await createStation(newStation, newSettings, userId);

        res.json(station);
    } catch (err) {
        next(err);
    }
}

async function getStationById(req, res, next) {
        try {
            const stattionId = req.params.id
            const station = await findStationById(stattionId)
            if(!station){
                res.status(400);
                console.log(station)
                throw new Error("Can't find station with this id");
            }
    
            const { userId } = req.payload
            
            if (station.userId !== userId){
                res.status(400);
                console.log(station+" "+userId)
                throw new Error('Not your sensor. ');
            }
            res.json(station);
        } catch (err) {
            next(err);
        }
}


module.exports = {
    createNewStation,
    getStationById
}