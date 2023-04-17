const { getAll } = require('./devices.services.js');


async function getAllDevices(req, res, next) {
        res.json(await getAll());
}

module.exports = {
    getAllDevices,
}