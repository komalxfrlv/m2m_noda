const { db } = require('../../utils/db');

async function getShelldueByStation(id) {
  return await db.shelldue.findMany({
    where: {
      stations: {
        some: {
          station: {
            id: id
          }
        }
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

async function findShellduesByType(userId, type) {
  return await db.shelldue.findMany({
    where: {
        userId: userId,
        shelldueType: type
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
  let successList = []
  for (let i = 0; i < shelldue.shelldueScript.conditions.length; i++) {
    successList.push(false)
  }
  return await db.shelldue.create({
    data: {
      name: shelldue.name,
      active: shelldue.active,
      shelldueScript: shelldue.shelldueScript,
      shelldueType: shelldue.shelldueType,
      deviceTypes: shelldue.deviceTypes,
      userId: userId,
      runtimeStart: shelldue.runtimeStart? shelldue.runtimeStart: null,
      success: successList
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

async function deleteShelldueById(shelldueId){
  return db.shelldue.delete({
    where:{
      id:shelldueId
    }
  })
}

async function postShelldueAtMQTT(shelldue){
  shelldue.executing = !shelldue.executing
  for (let i = 0; i < shelldue.shelldueScript.actions.set.length; i++) {
      const set = shelldue.shelldueScript.actions.set[i];
      const sensor = await db.sensor.findFirst({
        where:{
          elementId: set.elementId
        }
      })
      const station = await db.station.findFirst({
        where:{
          id: sensor.stationId
        }
      })
      const topic = `${shelldue.userId}/${station.gatewayId}/${sensor.elementId}/set`
      
      const postData = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topic,
          shelldueScript: set
        })
      }
      if(set.executing == shelldue.executing){
        console.log(postData.body)
        fetch(`http://${process.env.SHELLDUE_HOST}:${process.env.SHELLDUE_PORT}/`, postData)
        .then(async (res) => {
          console.log(await res.json())
        })
        .catch(err => {throw new Error(err)})
      }
    }
    return await db.shelldue.update({
      where:{
        id: shelldue.id
      },
      data:{
        executing: shelldue.executing
      }
    })
}

module.exports = {
  createShellduesForStations,
  getShelldueByStation,
  getShellduesByUser,
  getShelldueById,
  updateSheldueById,
  createNewShelldue,
  deleteShelldueById,
  findShellduesByType,
  postShelldueAtMQTT
};