const Ajv = require("ajv");
const ajv = new Ajv();

/*
    STATION VALIDATION
*/

async function stationCreating(data) {
    const schema = {
        type: "object",
        properties: {
            mac: { type: "string" },
            userId: { type: "string" },
            deviceId: { type: "string"},
        },
        required: ["mac", "userId", "deviceId"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}

exports.stationCreating = stationCreating

/*
    SETTINGS VALIDATION
*/

async function settingsCreating(data) {
    const schema = {
        type: "object",
        properties: {
            name: { type: "string" },
            station: { type: "string" },
            version: { type: "string" },
        },
        required: ["name", "stationId", "versionId"],
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
