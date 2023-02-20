const Ajv = require("ajv");
const ajv = new Ajv();

async function dataCreating(data) {
    const schema = {
        type: "object",
        properties: {
            data: { type: "json" },
            sensorId: { type: "string" },
        },
        required: ["data", "sensorId"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}

exports.dataCreating = dataCreating