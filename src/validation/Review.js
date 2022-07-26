import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        rate: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },

        Product: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        Market: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["rate", "title", "content", "User"],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        rate: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },

        Product: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        Market: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["rate", "title", "content", "User"],
    additionalProperties: false,
}

export default {
    validateCreate: (reviewData) => {
        const valid = ajv.validate(CreateSchema, reviewData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateReview: (reviewData) => {
        const valid = ajv.validate(UpdateSchema, reviewData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
