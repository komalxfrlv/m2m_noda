const {createSensorGroup,
    getAllGroups,
    addSensorToGroup,
    findAllUsersGroup} = require("./sensorGroups.services")
const {findUserById} = require("../../users/users.services")
async function addGroup(req, res, next){
try{
    if(!req.body.name) {
        throw new Error("Can't find name")
    }
    const newGroupId = await createSensorGroup(req.body.name)
    res.json(newGroupId)      
}
catch(err){
    next(err)
}
}

async function getGroups(req, res, next){
try{
    res.json(await getAllGroups())
}
catch(err){
    next(err)
}
}

async function postSensorToGroup(req, res, next){
try{
    const { deviceId } = req.body;
    if(!req.body.groupId){
        res.json("Can't find groupId in request")
        throw new Error("Can't find groupId in request")   
    }
    await addSensorToGroup(req.body.groupId, deviceId)
    res.json("DONE!")
}
catch(err){
    next(err)
}
}

module.exports = {
addGroup,
getGroups,
postSensorToGroup
}