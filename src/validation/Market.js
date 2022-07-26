import Ajv from "ajv"

const ajv = new Ajv()

const CreateMarketSchema = {
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

const UpdateMarketSchema = {
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
    validateCreate: (marketData) => {
        const valid = ajv.validate(CreateMarketSchema, marketData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateMarket: (marketData) => {
        const valid = ajv.validate(UpdateMarketSchema, marketData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
