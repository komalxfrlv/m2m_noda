const { db } = require('../../utils/db');

async function sendPushRequest(to, title, body){
    const push = {
        to: to,
        title: title,
        body: body,
      };
    const postData = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

    //make sure to serialize your JSON body
        body: JSON.stringify({
            push: push
        })
    }

    await fetch(`http://${process.env.PUSH_HOST}:${process.env.PUSH_PORT}/api/push`, postData)
    .then(async (res) => {console.log(await res.json())})
    .catch(err => {throw new Error(err)})
}

async function getPushFromDBByCode(code){
    return db.PushMessage.findUnique({
        where:{
            code: code
        }
    })
}

async function getAllPushesFromDB(){
    return db.PushMessage.findMany()
}

async function addPushInDB(push){
    return db.PushMessage.create({
        data:{
            title: push.title,
            body: push.content,
            code: push.code,
            condition: push.condition
        }
    })
}


module.exports = {
    sendPushRequest,
    getPushFromDBByCode,
    addPushInDB,
    getAllPushesFromDB
}