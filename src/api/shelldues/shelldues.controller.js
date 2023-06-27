const { 
    getShelldueByStation,
    getShellduesByUser,
    getShelldueById,
    updateSheldueById,
    createNewShelldue
} = require('./shelldues.services');

async function getShelldueForStation(req, res, next) {
    try {
        const { stationId } = req.payload;
        
        let shelldue = await getShelldueByStation(stationId)

        res.json(shelldue);
    } catch (err) {
        next(err);
    }
}

async function getAllShellduesOfUser(req, res, next) {
    try {
        const { userId } = req.payload;
        
        let shelldues = await getShellduesByUser(userId)

        res.json(shelldues);
    } catch (err) {
        next(err);
    }
}

async function getShelldue(req, res, next) {
    try {
        const { shelldueId } = req.payload;
        
        let shelldue = await getShelldueById(shelldueId)

        res.json(shelldue);
    } catch (err) {
        next(err);
    }
}

async function addNewShelldue(req, res, next) {
    try {
        const { shelldue } = req.payload;
        
        let newShelldue = await createNewShelldue(shelldue)
        
        res.json(newShelldue);
    } catch (err) {
        next(err);
    }
}

async function updateShelldue(req, res, next) {
    try {
        const { shelldue } = req.payload;
        const { shelldueId } = req.payload;
        
        let updatedShelldue = await updateSheldueById(shelldueId, shelldue)
        
        res.json(updatedShelldue);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getShelldueForStation,
    getAllShellduesOfUser,
    getShelldue,
    addNewShelldue,
    updateShelldue,
}