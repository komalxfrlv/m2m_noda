const Ajv = require("ajv");
const ajv = new Ajv();

/*
    USER VALIDATION
*/

async function validateUserCreating(data) {
    const schema = {
        type: "object",
        properties: {
            name: { type: "string" },
            surname: { type: "string" },
            patronymic: { type: "string"},
            email: { type: "string" },
            password: { type: "string"},
            phone: { type: "integer" },
            city: { type: "string" },
        },
        required: [
            "name", "surname", "patronymic", 
            "email", "password", "phone", "city"
        ],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}
exports.validateUserCreating = validateUserCreating;