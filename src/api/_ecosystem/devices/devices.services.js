const bcrypt = require('bcrypt');
const { db } = require('../../../utils/db');

async function getAll() {
    return await db.DeviceType.findMany();
}

module.exports = {
    getAll,
};