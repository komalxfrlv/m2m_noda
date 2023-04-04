const dataValidator = require('./data.validators');
const { createData } = require('./data.services');

async function create(req, res, next) {
    try {
        const data = req.body.data
        console.log(data)
        /*
        if (! await dataValidator.dataCreating(data)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }
        */
        res.json(await createData(data));

    } catch (err) {
        next(err);
    }
}

exports.create = create;