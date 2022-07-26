import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        about: { type: "string" },

        Categories: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-f\\d]{24}$",
            },
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: [
        "name",
        "username",
        "title",
        "description",
        "about",

        "Categories",
        "User",
    ],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        about: { type: "string" },

        Categories: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-f\\d]{24}$",
            },
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: [
        "name",
        "username",
        "title",
        "description",
        "about",

        "Categories",
        "User",
    ],
    additionalProperties: false,
}
export default {
    validateCreate: (data) => {
        const valid = ajv.validate(CreateSchema, data)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdate: (data) => {
        const valid = ajv.validate(UpdateSchema, data)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
