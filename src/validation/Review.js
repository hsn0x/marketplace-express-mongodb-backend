import Ajv from "ajv"

const ajv = new Ajv()

const CreateReviewSchema = {
    type: "object",
    properties: {
        rate: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },
        productId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["rate", "title", "content", "productId", "UserId"],
    additionalProperties: false,
}

const UpdateReviewSchema = {
    type: "object",
    properties: {
        rate: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },
        productId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["rate", "title", "content", "productId", "UserId"],
    additionalProperties: false,
}
export default {
    validateCreate: (reviewData) => {
        const valid = ajv.validate(CreateReviewSchema, reviewData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateReview: (reviewData) => {
        const valid = ajv.validate(UpdateReviewSchema, reviewData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
