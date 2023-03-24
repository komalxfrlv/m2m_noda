const { db } = require('../../../utils/db');

async function createVersion(version) {

    let created_version = await db.version.create({
        data: version,
    });

    return created_version;
}

module.exports = {
    createVersion
}