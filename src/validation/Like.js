import Ajv from "ajv"

const ajv = new Ajv()

const CreateLikeSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        about: { type: "string" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "name",
        "username",
        "title",
        "description",
        "about",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}

const UpdateLikeSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        about: { type: "string" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "name",
        "username",
        "title",
        "description",
        "about",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}
export default {
    validateCreateLike: (likeData) => {
        const valid = ajv.validate(CreateLikeSchema, likeData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateLike: (likeData) => {
        const valid = ajv.validate(UpdateLikeSchema, likeData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
