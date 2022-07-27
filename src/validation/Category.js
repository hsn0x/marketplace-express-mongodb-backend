import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        type: { type: "string" },
        parentId: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },

        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "description", "type", "User"],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        parentId: { type: "string" },
        type: { type: "string" },

        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "description", "type", "User"],
    additionalProperties: false,
}

export default {
    validateCreate: (categoryData) => {
        const valid = ajv.validate(CreateSchema, categoryData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdate: (categoryData) => {
        const valid = ajv.validate(UpdateSchema, categoryData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
