const bcrypt = require('bcrypt');
const { db } = require('../../../utils/db');

async function getAll() {
    return await db.DeviceType.findMany();
}

async function createDevice(device) {
    let newDevice = await db.DeviceType.create({
        data: device,
    });
    return newDevice.id;
}

async function findDevicebyId(id) {
    return await db.DeviceType.findUnique({
        where: { 
            id:id,
        }});
}

async function addToGroup(deviceId, groupId){
    return await db.deviceType.update({
        where:{
            id: deviceId
        },
        data:{
            groupId:groupId
        }
    })
}

module.exports = {
    getAll,
    findDevicebyId,
    createDevice,
    addToGroup
};