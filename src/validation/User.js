import Ajv from "ajv"

const ajv = new Ajv()

const CreateUserSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        description: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
        age: { type: "number" },
        gender: { type: "string" },
    },
    required: [
        "firstName",
        "lastName",
        "username",
        "email",
        "password",
        "passwordHash",
        "passwordSalt",
    ],
    additionalProperties: false,
}

const UpdateUserSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        description: { type: "string" },
        age: { type: "number" },
        gender: { type: "string" },
    },
    required: ["firstName", "lastName", "username", "age", "gender"],
    additionalProperties: false,
}

const UpdateUserEmailSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: ["email"],
    additionalProperties: false,
}

const UpdateUserPasswordSchema = {
    type: "object",
    properties: {
        newPassword: { type: "string" },
        password: { type: "string" },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
    },
    required: ["newPassword", "password", "passwordHash", "passwordSalt"],
    additionalProperties: false,
}

export default {
    validateCreateUser: (userData) => {
        const valid = ajv.validate(CreateUserSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },

    validateUpdateUser: (userData) => {
        const valid = ajv.validate(UpdateUserSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },

    validateUpdateUserEmail: (userData) => {
        const valid = ajv.validate(UpdateUserEmailSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },

    validateUpdateUserPassword: (userData) => {
        const valid = ajv.validate(UpdateUserPasswordSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
