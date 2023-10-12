const { db } = require('./db');
async function writeToLog(data, code){

    const logCode = await db.EventCode.findUnique({
        where:{
            code: code
        }
    })
    data.message = logCode.description
    if (logCode.description.indexOf('{sensorName}') && data.sensorName !== undefined){
        data.message = logCode.description.replace('{sensorName}', data.sensorName);
        logCode.description = data.message
        delete data.sensorName
    }
    if (logCode.description.indexOf('{shelldueName}') && data.shelldueName !== undefined){
        data.message = logCode.description.replace('{shelldueName}', data.shelldueName);
        logCode.description = data.message
        delete data.shelldueName
    }
    // и так далее

    data.codeId = logCode.id
    const eLog = await db.EventLog.create({
        data:data
    })
    //console.log(eLog)
    return eLog
}

module.exports = {
    writeToLog
}