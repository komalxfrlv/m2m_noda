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

module.exports = {
    getAll,
    createDevice,
};