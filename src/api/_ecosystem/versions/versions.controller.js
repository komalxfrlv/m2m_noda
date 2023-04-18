const {
    validateVersionCreating
} = require('./versions.validators');
const { findUserById } = require('../../users/users.services');

const {
    createVersion,
    getAll,
} = require('./versions.services')


async function createNewVersion(req, res, next) {
    try {
        const { userId } = req.payload;

        const user = await findUserById(userId);

        let version = req.body;
        await validateVersionCreating(version)

        let created_version = await createVersion(version);

        res.json(created_version);
    } catch (err) {
        next(err);
    }
}


async function getAllVersion(req, res, next) {
    try {
        res.json(await getAll());
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewVersion,
    getAllVersion
}