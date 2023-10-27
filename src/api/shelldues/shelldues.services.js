const { db } = require('../../utils/db');
const {writeToLog} = require('../../utils/eventLog')
const {findSensorByElementId} = require('../_ecosystem/sensors/sensors.services')

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
    include:{
      shellduesChainLink:{
        orderBy:{
          number:"asc"
        }
      }
    }
  });
}

async function getShelldueById(id) {
  return await db.shelldue.findUnique({
    where: {
      id: id
    },
    include:{
      ShellduesChainLink:true
    }
  });
}

async function findShellduesByType(userId, type) {
  return await db.shelldue.findMany({
    where: {
        userId: userId,
        shelldueType: type
    },
    include:{
      ShellduesChainLink:{
        orderBy:{
          number:"asc"
        }
      }
    }
  });
}

async function updateSheldueById(id, shelldue) {
  console.log(shelldue)
  if(shelldue.chain &&shelldue.chain.length){
    await updateChain(shelldue, id)
    delete shelldue.chain
  }
  return await db.shelldue.update({
    where: {
      id: id,
    },
    data: shelldue
  });
}

async function updateChain(shelldue, shelldueId){
  await db.shellduesChainLink.deleteMany({
    where:{
      shelldueId:shelldueId
    }
  })
  
  console.log(shelldue.chain)
  shelldue.chain.forEach(async (link, index) => {
    link.shelldueId = shelldueId
    link.number = index
    await db.shellduesChainLink.create({
      data:link
    })
  });
}

async function createNewShelldue(shelldue, userId) {
  let successList = []
  if(shelldue.shelldueScript.conditions){
    for (let i = 0; i < shelldue.shelldueScript.conditions.length; i++) {
      successList.push(false)
    }
  }
  const createdShelldue = await db.shelldue.create({
    data: {
      name: shelldue.name,
      active: shelldue.active,
      shelldueScript: shelldue.shelldueScript,
      shelldueType: shelldue.shelldueType,
      deviceTypes: shelldue.deviceTypes,
      userId: userId,
      runtimeStart: shelldue.runtimeStart? shelldue.runtimeStart: null,
      runtimeEnd: shelldue.runtimeEnd? shelldue.runtimeEnd: null,
      duration: shelldue.duration,
      success: successList,
      activeDays: shelldue.activeDays
    }
  });
  shelldue.stations.forEach(async stationId => {
    await db.shellduesOnStations.create({
      data:{
        stationId:stationId,
        shelldueId: createdShelldue.id
      }
    })
  });
  shelldue.chain? createChain(shelldue, createdShelldue.id):""
  return createdShelldue 
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

async function createChain(shelldue, shelldueId){
  shelldue.chain.forEach(async (link, index) => {
    link.shelldueId = shelldueId
    link.number = index
    await db.shellduesChainLink.create({
      data:link
    })
  });
}

async function postShelldueAtMQTT(shelldue){
  try{

    const postData = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shelldue:shelldue
      })
    }
  fetch(`http://${process.env.SHELLDUE_CHAIN_HOST}:${process.env.SHELLDUE_CHAIN_PORT}/`, postData)
      .then(async (res) => {
      console.log(await res.json())
      })
      .catch(err => {throw new Error(err)})
  }
  catch(err){
    console.log(err)
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