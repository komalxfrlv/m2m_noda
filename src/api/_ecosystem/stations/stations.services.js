const { db } = require('../../../utils/db');

async function createStation(station, settings, userId) {

    station.userId = userId

    let created_station = await db.station.create({
        data: station,
    });

    settings.stationId = created_station.id;

    let station_id = created_station.id

    await db.stationSettings.create({
        data: settings,
    });

    return station_id;
}

async function findStationById(id) {
    return await db.station.findUnique({
        where: { 
            id:id,
        },
    });
}

async function updateStationById(id, station) {
    return await db.station.update({
        where: {
            id,
        },
        data: station,
    });
}

async function deleteStationById(id) {
    return await db.station.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    createStation,
    findStationById,
    updateStationById,
    deleteStationById,
}