const { db } = require('./db');

async function writeToLog(data, code){

    const logCode = await db.EventCode.findUnique({
        where:{
            code: code
        }
    })

    if (data.stationId !== undefined)
        data.message = logCode.description.replace('{stationId}', data.stationId);
    // и так далее

    data.codeId = logCode.id
    const eLog = await db.EventLog.create({
        data:data
    })
    return eLog
}

module.exports = {
    writeToLog
}