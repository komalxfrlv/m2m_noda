const { db } = require('../../../utils/db');

async function createSensorGroup(name, userId) {

    let created_group = await db.deviceGroups.create({
        data: {
            name: name
        },
    });
    return created_group.id;
}
async function getAllGroups() {
    return await db.deviceGroups.findMany({
        include:{
            deviceGroups:true
        }
    });
}

async function addSensorToGroup(groupId, deviceId){
    let sensors_at_groups = await db.DeviceAtDeviceGroups.create({
        data: {
            deviceGroupsId: groupId,
            deviceId: deviceId
        },
    }); 
    return sensors_at_groups.id
}

module.exports = {
    createSensorGroup,
    getAllGroups,
    addSensorToGroup
}