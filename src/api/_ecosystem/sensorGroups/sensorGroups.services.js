const { db } = require('../../../utils/db');

async function createSensorGroup(name) {

    let created_group = await db.deviceGroup.create({
        data: {
            name: name
        },
    });
    return created_group.id;
}
async function getAllGroups() {
    return await db.deviceGroup.findMany({
    });
}


module.exports = {
    createSensorGroup,
    getAllGroups,
}