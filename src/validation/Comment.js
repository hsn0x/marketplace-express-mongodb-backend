import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        content: { type: "string" },
        Product: { type: "string" },
        User: { type: "string" },
    },
    required: ["title", "content", "Product", "User"],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        content: { type: "string" },
        Product: { type: "string" },
        User: { type: "string" },
    },
    required: ["title", "content", "Product", "User"],
    additionalProperties: false,
}

export default {
    validateCreate: (commentData) => {
        const valid = ajv.validate(CreateSchema, commentData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateComment: (commentData) => {
        const valid = ajv.validate(UpdateSchema, commentData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
