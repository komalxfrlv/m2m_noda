const {
    createSensorGroup,
    getAllGroups 
} = require("./sensorGroups.services")

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

module.exports = {
addGroup,
getGroups
}