const { db } = require('../../../utils/db');

async function getAll() {
    return await db.city.findMany();
}

module.exports = {
    getAll,
}