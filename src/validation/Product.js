import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },

        Market: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
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
        "title",
        "description",
        "price",
        "quantity",
        "Market",
        "Categories",
        "User",
    ],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        Market: { type: "string" },
        Categories: {
            type: "array",
            items: {
                type: "string",
            },
        },
        User: { type: "string" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "Market",
        "Categories",
        "User",
    ],
    additionalProperties: false,
}
export default {
    validateCreate: (productData) => {
        const valid = ajv.validate(CreateSchema, productData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdate: (productData) => {
        const valid = ajv.validate(UpdateSchema, productData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
