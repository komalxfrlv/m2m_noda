const Ajv = require("ajv");
const ajv = new Ajv();

/*
    SENSOR VALIDATION
*/

async function sensorCreating(data) {
    const schema = {
        type: "object",
        properties: {
            mac: { type: "string" },
            deviceId: { type: "string"},
        },
        required: ["mac", "deviceId"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}

exports.sensorCreating = sensorCreating

/*
    SETTINGS VALIDATION
*/

async function settingsCreating(data) {
    const schema = {
        type: "object",
        properties: {
            name: { type: "string" },
            versionId: { type: "string" },
        },
        required: ["name", "versionId"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}

exports.settingsCreating = settingsCreating;

async function settingsUpdating(data) {
    const schema = {
        type: "object",
        properties: {
            version: { type: "string" },
            name: { type: "string" }
        },
        required: ["version", "name"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}
