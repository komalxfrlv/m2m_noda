const { db } = require('../../../../utils/db');
const md5 = require('md5');

async function createStation(station, settings) {
    let mac = md5(station.mac + Date.now().toString());
    
    station.mac = mac;

    let created_station = await db.station.create({
        data: station,
    });

    settings.stationId = created_station.id;

    let created_settings = await db.stationSettings.create({
        data: settings,
    });

    return {created_station, created_settings, mac}
}

async function findStationById(id) {
    return await db.station.findUnique({
        where: { 
            id,
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