const { db } = require('../../../utils/db');

async function getAll() {
    return await db.version.findMany();
}

async function createVersion(version) {

    let created_version = await db.version.create({
        data: version,
    });

    return created_version;
}

module.exports = {
    createVersion,
    getAll
}