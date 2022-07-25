import Ajv from "ajv"

const ajv = new Ajv()

const CreateCommentSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        content: { type: "string" },
        productId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["title", "content", "productId", "UserId"],
    additionalProperties: false,
}

const UpdateCommentSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        content: { type: "string" },
        productId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["title", "content", "productId", "UserId"],
    additionalProperties: false,
}

export default {
    validateCreateComment: (commentData) => {
        const valid = ajv.validate(CreateCommentSchema, commentData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateComment: (commentData) => {
        const valid = ajv.validate(UpdateCommentSchema, commentData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
