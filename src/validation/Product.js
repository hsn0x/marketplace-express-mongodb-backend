import Ajv from "ajv"

const ajv = new Ajv()

const CreateProductSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        MarketId: { type: "number" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "MarketId",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}

const UpdateProductSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        MarketId: { type: "number" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "MarketId",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}
export default {
    validateCreateProduct: (productData) => {
        const valid = ajv.validate(CreateProductSchema, productData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateProduct: (productData) => {
        const valid = ajv.validate(UpdateProductSchema, productData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
