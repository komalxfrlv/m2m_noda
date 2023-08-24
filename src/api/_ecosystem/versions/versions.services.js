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

async function findVersionById(id) {
    console.log(id)
    return await db.version.findUnique({
        where: { 
            id:id,
        }});
}

async function findLatestVersionId(deviceId){
    const version = await db.version.findFirst({
        where:{
            deviceId:deviceId
        },
        orderBy: {
            createdAt:"desc"
        }
    })
    return version.id 
}

module.exports = {
    createVersion,
    findVersionById,
    getAll,
    findLatestVersionId
}