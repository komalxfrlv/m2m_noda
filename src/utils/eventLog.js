const { db } = require('./db');

async function writeToLog(data, code){

    const logCode = await db.EventCode.findUnique({
        where:{
            code: code
        }
    })

    data.codeId = logCode.id
    const eLog = await db.EventLog.create({
        data:data
    })
    return eLog
}

module.exports = {
    writeToLog
}