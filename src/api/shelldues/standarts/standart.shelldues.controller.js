const {parseMacDeviceType} = require('../../_ecosystem/stations/stations.services')
const {findAllStandartsByCode,
        createNewStandartScript} = require('./standart.shelldues.services')

async function getStandartScriptsByDeviceCode(req, res, next){
    try{
        const deviceType = await parseMacDeviceType(req.params.mac)
        res.json(await findAllStandartsByCode(deviceType.id))
    }
    catch(err){
        next(err)
    }

}

async function postNewStandartScript(req, res, next){
    try{
        const {mac, script, description} = req.body
        const deviceType = await parseMacDeviceType(mac)
        res.json(await createNewStandartScript(deviceType.id, script, description)) 
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getStandartScriptsByDeviceCode,
    postNewStandartScript
}