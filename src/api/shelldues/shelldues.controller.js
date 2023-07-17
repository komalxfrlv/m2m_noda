const { 
    getShelldueByStation,
    getShellduesByUser,
    getShelldueById,
    updateSheldueById,
    createNewShelldue,
    createShellduesForStations
} = require('./shelldues.services');

const {
    findStationById
} = require('../_ecosystem/stations/stations.services')

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

async function addNewShelldue(req, res, next) {
    try {
        const { shelldue } = req.body
        const { userId } = req.payload

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
        const { shelldueId } = req.body
        
        let updatedShelldue = await updateSheldueById(shelldueId, shelldue)
        
        res.json(updatedShelldue)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getShelldueForStation,
    getAllShellduesOfUser,
    getShelldue,
    addNewShelldue,
    updateShelldue,
}