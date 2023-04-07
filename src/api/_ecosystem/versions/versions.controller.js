const versionValidator = require('./versions.validators');
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

        if(user.role === "administrator" || user.role === "developer")
        {
            if (!await versionValidator.validateVersionCreating(version)) {
                res.status(400);
                throw new Error('You must provide all fields of version.');
            }

            let created_version = await createVersion(version);

            res.json(created_version);
        } else {
            throw new Error('No permissions');
        }
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