const Ajv = require("ajv");
const ajv = new Ajv();

/*
    SENSOR VALIDATION
*/

async function validateSensor(data) {
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

/*
    SETTINGS VALIDATION
*/

async function validateSensorSettings(data) {
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

module.exports = {
    validateSensor,
    validateSensorSettings,
    settingsUpdating,
}