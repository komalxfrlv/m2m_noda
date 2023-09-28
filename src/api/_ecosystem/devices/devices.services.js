const bcrypt = require('bcrypt');
const { db } = require('../../../utils/db');

async function getAll() {
    return await db.DeviceType.findMany({
        include:{
            defaultScripts: true
        }
    });
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
    return await db.DeviceTypesAtGroup.create({
        data:{
            deviceId:deviceId,
            groupId:groupId
        }
    })
}

async function updateDeviceType(device){
    return await db.deviceType.update({
        where:{
            id: device.id
        },
        data:device
    })
}

module.exports = {
    getAll,
    findDevicebyId,
    createDevice,
    addToGroup,
    updateDeviceType
};