const { 
    getShelldueByStation,
    getShellduesByUser,
    getShelldueById,
    updateSheldueById,
    createNewShelldue,
    createShellduesForStations,
    deleteShelldueById,
    findShellduesByType,
    postShelldueAtMQTT
} = require('./shelldues.services');

const {
    findStationById
} = require('../_ecosystem/stations/stations.services')

const {writeToLog} = require('../../utils/eventLog')
const {findSensorByElementId} = require('../_ecosystem/sensors/sensors.services')

async function getShelldueForStation(req, res, next) {
    try {
        const { stationId } = req.params
        if(!await findStationById(stationId)){
            throw new Error(`Can't find station with this id`)
        }
        let shelldue = await getShelldueByStation(stationId)

        res.json(shelldue)
    } catch (err) {
        next(err)
    }
}

async function getAllShellduesOfUser(req, res, next) {
    try {
        const { userId } = req.payload
        let shelldues = await getShellduesByUser(userId)
    
        res.json(shelldues)
    } catch (err) {
        next(err)
    }
}

async function getShelldue(req, res, next) {
    try {
        const { shelldueId } = req.params
        let shelldue = await getShelldueById(shelldueId)
        if(!shelldue){
            throw new Error(`Can't find shelldue`)
        }

        res.json(shelldue)
    } catch (err) {
        next(err)
    }
}

async function getShellduesByType(req, res, next){
    try{
        res.json(await findShellduesByType(req.payload.userId, req.params.type))
    }
    catch(err){
        next(err)
    }
}

async function addNewShelldue(req, res, next) {
    try {
        const { shelldue } = req.body
        const { userId } = req.payload
        console.log(shelldue)
        console.log(userId)
        let newShelldue = await createNewShelldue(shelldue, userId)

        await createShellduesForStations(shelldue.stations, newShelldue.id)
        
        res.json(newShelldue.id)
    } catch (err) {
        next(err)
    }
}

async function updateShelldue(req, res, next) {
    try {
        const { shelldue } = req.body
        const { shelldueId } = req.params
        
        let updatedShelldue = await updateSheldueById(shelldueId, shelldue)
        
        res.json(updatedShelldue)
    } catch (err) {
        next(err)
    }
}

async function deleteShelldue(req, res, next) {
    try {
        const { shelldueId } = req.params
        
        let shelldue = await getShelldueById(shelldueId)
        if(!shelldue){
            throw new Error(`Can't find shelldue`)
        }
        if(await deleteShelldueById(shelldueId)){
            res.json(shelldue)
        }
        else{
            throw new Error('Somethink gone wrong')
        }
    } catch (err) {
        next(err)
    }
}
async function sendTipShelldues(req, res, next){
    try{
        const shelldue = await getShelldueById(req.body.shelldueId)
        
        if(shelldue.shelldueType != "tip"){
            throw new Error("Wrong type of script")
        }
        if( req.payload.userId != shelldue.userId){
            throw new Error("Not your shelldue")
        }
        console.log(shelldue.shelldueScript.actions.set)
        res.json(await postShelldueAtMQTT(shelldue))
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getShelldueForStation,
    getAllShellduesOfUser,
    getShelldue,
    addNewShelldue,
    updateShelldue,
    deleteShelldue,
    getShellduesByType,
    sendTipShelldues
}