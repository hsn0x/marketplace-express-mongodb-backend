import Ajv from "ajv"

const ajv = new Ajv()

const CreateCategorySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        parentId: { type: "number" },
        UserId: { type: "number" },
        type: { type: "string" },
    },
    required: ["name", "parentId", "type", "UserId"],
    additionalProperties: false,
}

const UpdateCategorySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        parentId: { type: "number" },
        UserId: { type: "number" },
        type: { type: "string" },
    },
    required: ["name", "type", "parentId", "UserId"],
    additionalProperties: false,
}
export default {
    validateCreateCategory: (categoryData) => {
        const valid = ajv.validate(CreateCategorySchema, categoryData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateCategory: (categoryData) => {
        const valid = ajv.validate(UpdateCategorySchema, categoryData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
