const { db } = require('../../utils/db');

async function getShelldueByStation(id) {
  return await db.shelldue.findUnique({
    where: {
      stations: {
        stationId: id
      }
    },
  });
}

async function getShellduesByUser(id) {
  return await db.shelldue.findMany({
    where: {
      userId: id
    },
  });
}

async function getShelldueById(id) {
  return await db.shelldue.findUnique({
    where: {
      id: id
    },
  });
}

async function updateSheldueById(id, shelldue) {
  return await db.shelldue.update({
    where: {
      id: id,
    },
    data: shelldue
  });
}

async function createNewShelldue(shelldue, userId) {
  return await db.shelldue.create({
    data: {
      name: shelldue.name,
      active: shelldue.active,
      shelldueScript: shelldue.shelldueScript,
      deviceTypes: shelldue.deviceTypes,
      userId: userId
    }
  });
}

async function createShellduesForStations(stations, shelldueId) {
  stations.forEach(async (station) => {
    await db.shellduesOnStations.create({
      data: {
        shelldueId: shelldueId,
        stationId: station,
      }
    })
  });
}

module.exports = {
  createShellduesForStations,
  getShelldueByStation,
  getShellduesByUser,
  getShelldueById,
  updateSheldueById,
  createNewShelldue,
};