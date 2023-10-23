const { db } = require('./db');
async function writeToLog(data, code){
    try{
      const url = `http://${process.env.LOGGER_HOST || "localhost"}:${process.env.LOGGER_PORT || "5282"}/${code}` 
      const postData = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data
        })
      }
      data.shelldueName? console.log(`${data.shelldueName} change status. Log req sended.\n User with id:${data.userId} can see it soon`):""
      await fetch(url, postData)
      .then(`log sended to logService`)
      .catch(err => {throw new Error(err)})
    }
    catch(err){
      console.log(err)
    }
}

module.exports = {
    writeToLog
}