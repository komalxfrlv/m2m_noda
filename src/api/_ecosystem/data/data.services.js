const { db } = require('../../../utils/db');

async function createData(data) {
    return await db.data.create({
        data: data
    });
}

module.exports = {
    createData,
}