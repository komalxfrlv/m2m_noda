const { db } = require('../../utils/db');
const { findUserById,
    updateUserById, 
    findUserByEmail} = require('../users/users.services');

async function getShelldueByStation(id) {
    return await db.shelldue.findUnique({
      where: {
        stationId: id,
      },
    });
}

async function getShellduesByUser(id) {
    return await db.shelldue.findMany({
      where: {
        userId: id,
      },
    });
}

async function getShelldueById(id) {
    return await db.shelldue.findUnique({
      where: {
        id: id,
      },
    });
}

async function updateSheldueById(id, shelldue) {
    return await db.shelldue.update({
        where: {
            id: id,
          },
        data: shelldue,
    });
}

async function createNewShelldue(shelldue) {
    return await db.shelldue.create({
        data: shelldue,
    });
}

module.exports = {
    getShelldueByStation,
    getShellduesByUser,
    getShelldueById,
    updateSheldueById,
    createNewShelldue,
  };