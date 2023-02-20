const versionValidator = require('./versions.validators');

async function createNewVersion(req, res, next) {
    try {
        
        res.json();
    } catch (err) {
        next(err);
    }
}