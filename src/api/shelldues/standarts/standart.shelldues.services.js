const { db } = require('../../../utils/db');

async function findAllStandartsByCode(deviceId){
    const deviceTypesAtDefaultScripts = await db.deviceTypesAtDefaultScripts.findMany({
        where:{
            deviceId:deviceId
        }
    })
    return await db.defaultScripts.findMany({
        where:{
            id: deviceTypesAtDefaultScripts.defaultScriptId
        }
    }) 
}

async function findAditionalStandartsByCode(deviceId){
    const deviceTypesAtDefaultScripts = await db.deviceTypesAtDefaultScripts.findMany({
        where:{
            deviceId:deviceId
        }
    })
    return await db.defaultScripts.findMany({
        where:{
            id: deviceTypesAtDefaultScripts.defaultScriptId,
            deviceId:{count: 1}
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