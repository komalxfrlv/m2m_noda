const { Expo } = require('expo-server-sdk')

const {
    getAllUsersToken: getAllUsersToken, findUserById
} = require("../users/users.services")

const {
    sendPushRequest,
} = require("./pushes.services")

const {
    getAllUsersTokenInGroup
} = require("../_ecosystem/userGroups/userGroups.services")


async function sendOnePush(req, res, next) {
    try{
    console.log(req.body)
    const push = req.body.push
    await sendPushRequest(push.token, push.title, push.content)
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
        usersTokens.forEach(async user => {
            user.token ? tokenArr.push(user.token):'';
            if (tokenArr.length == 100){
                await sendPushRequest(tokenArr, push.title, push.content)
                tokenArr = []
            }
        } )
        if(tokenArr){
            console.log(tokenArr)
            await sendPushRequest(tokenArr, push.title, push.content)
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
            user.token ? tokenArr.push(user.token):'';
            if (tokenArr.length == 100){
                await sendPushRequest(tokenArr, push.title, push.content)
                tokenArr = []
            }
        }
        if(tokenArr.length > 0){
            console.log(tokenArr)
            await sendPushRequest(tokenArr, push.title, push.content)
        }
        res.json('DONE!')
    }
    catch(err){
        next(err)
    }
}


module.exports = {
    sendOnePush,
    sendPushForAll,
    sendPushForFroup: sendPushForGroup
};