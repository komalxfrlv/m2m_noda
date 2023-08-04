const { Expo } = require('expo-server-sdk')

const {
    getAllUsersToken: getAllUsersToken, findUserById, findUserByEmail
} = require("../users/users.services")

const {
    sendPushRequest,
    getPushFromDBByCode,
    addPushInDB,
    getAllPushesFromDB
} = require("./pushes.services")

const {
    getAllUsersTokenInGroup
} = require("../_ecosystem/userGroups/userGroups.services")


async function sendOnePush(req, res, next) {
    try{
    const push = req.body.push
    await sendPushRequest(push.token, push.title, push.content)
    res.json('DONE!')
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

async function sendOnePushByUserId(req, res, next) {
    try{
    const push = req.body.push
    const user = await findUserById(req.body.userId)
    await sendPushRequest(user.token, push.title, push.content)
    res.json('DONE!')
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

async function sendOnePushByUserEmail(req, res, next) {
    try{
    const push = req.body.push
    const user = await findUserByEmail(req.body.email)
    await sendPushRequest(user.token, push.title, push.content)
    res.json('DONE!')
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

async function sendPushForAll(req, res, next){
    try{
        let push = req.body.push
        let tokenArr = []
        const usersTokens = await getAllUsersToken()
        for (let i = 0; i < usersTokens.length; i++) {
            const userTokens = usersTokens[i]
                userTokens.token ? userTokens.token.forEach( (token) => tokenArr.push(token) ):""
                if (tokenArr.length == 100){
                sendPushRequest(tokenArr, push.title, push.content)
                console.log(tokenArr)
                tokenArr = []
                }
        }
        if(tokenArr.length){
            sendPushRequest(tokenArr, push.title, push.content)
            console.log(tokenArr)
        }
        res.json('DONE!')
    }
    catch(err){
        next(err)
    }
    
}

async function sendPushForGroup(req, res, next){
    try{
        let push = req.body.push
        let tokenArr = []
        const groupTokens = await getAllUsersTokenInGroup(req.body.groupId)
        for (let i= 0; i < groupTokens[0].pushGroups.length; i ++) {
            const userId = groupTokens[0].pushGroups[i].userId
            const user = await findUserById(userId) 
            user.token.length ? user.token.forEach((token) => tokenArr.push(token)):'';
            if (tokenArr.length == 100){
                sendPushRequest(tokenArr, push.title, push.content)
                tokenArr = []
            }
        }
        if(tokenArr.length > 0){
            console.log(tokenArr)
            sendPushRequest(tokenArr, push.title, push.content)
        }
        res.json('DONE!')
    }
    catch(err){
        next(err)
    }
}

async function sendPushForMyself(req, res, next){
    try{
        console.log(req.payload)
        const user = await findUserById(req.payload.userId)
        const push = req.body.push
        await sendPushRequest(user.token, push.title, push.content)
        res.json('DONE!')
    }
    catch(err){
        next(err)
    }
}

async function getPushByCode(req, res, next){
    try{
        res.json(await getPushFromDBByCode(Number(req.params.code)))
    }
    catch(err){
        next(err)
    }
}

async function getAllPushes(req, res, next){
    try{
        res.json(await getAllPushesFromDB())
    }
    catch(err){
        next(err)
    }
}

async function addPush(req, res, next){
    try{
        res.json(await addPushInDB(req.body.push))
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    sendOnePush,
    sendPushForAll,
    sendPushForGroup,
    sendOnePushByUserEmail,
    sendOnePushByUserId,
    sendPushForMyself,
    getPushByCode,
    addPush,
    getAllPushes
};