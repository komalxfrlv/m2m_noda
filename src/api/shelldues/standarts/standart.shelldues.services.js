const { db } = require('../../../utils/db');

async function findAllStandartsByCode(deviceId){
    return await db.DefaultScripts.findMany({
        where:{
            deviceId:deviceId
        }
    })
}

async function createNewStandartScript(deviceId, script, description){
    return await db.DefaultScripts.create({
        data:{
            deviceId:   deviceId,
            description:    description?    description:    null,
            script: script
        }
    })
}

module.exports = {
    findAllStandartsByCode,
    createNewStandartScript
}