import Ajv from "ajv"

const ajv = new Ajv()

const CreateFavoriteSchema = {
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

const UpdateFavoriteSchema = {
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
    validateCreateFavorite: (favoriteData) => {
        const valid = ajv.validate(CreateFavoriteSchema, favoriteData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateFavorite: (favoriteData) => {
        const valid = ajv.validate(UpdateFavoriteSchema, favoriteData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
