const dataValidator = require('./data.validators');
const { createData } = require('./data.services');

async function create(req, res, next) {
    try {
        data = req.data

        if (await dataValidator.dataCreating(data)) {
            res.status(400);
            throw new Error('You must provide all fields of station.');
        }

        let data = await createData(data);

        res.json(sensor.data);

    } catch (err) {
        next(err);
    }
}

exports.create = create;