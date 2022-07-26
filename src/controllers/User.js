import { genPassword, passwordMatch } from "../lib/passwordUtils.js"
import {} from "../lib/removeSensitiveData.js"
import {
    MarketModel,
    ProductModel,
    ImageModel,
    AvatarModel,
    RoleModel,
} from "../models/index.js"
import { usersQueries } from "../queries/index.js"
import { UserValidation } from "../validation/index.js"

export default {
    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await usersQueries.findAllQuery(
            ["Avatars", "Images", "Roles"],
            [],
            params
        )
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getById: async (req, res) => {
        const id = req.params.id
        const user = await usersQueries.findByIdQuery(
            id,
            ["Avatars", "Images", "Roles"],
            []
        )
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({ message: `User not found with ID: ${id}` })
        }
    },
    getByUsername: async (req, res) => {
        const username = req.params.username
        const user = await usersQueries.findOneQuery(
            { username },
            ["Avatars", "Images", "Roles"],
            []
        )
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({
                message: `User not found with ID: ${username}`,
            })
        }
    },
    getByEmail: async (req, res) => {
        const email = parseInt(req.params.email)
        const user = await usersQueries.findOneQuery(
            { email },
            ["Avatars", "Images", "Roles"],
            []
        )
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({
                message: `User not found with email: ${email}`,
            })
        }
    },
    create: async (req, res, next) => {
        const {
            firstName,
            lastName,
            username,
            description,
            email,
            password,
            age,
            gender,
        } = req.body

        const data = {
            firstName,
            lastName,
            username,
            description,
            email,
            password,
            gender,
            age: null,
            passwordHash: null,
            passwordSalt: null,
        }
        data.age = Number(age)

        const hashedPassword = genPassword(data.password)
        data.passwordHash = hashedPassword.hash
        data.passwordSalt = hashedPassword.salt

        const isUserValid = validateCreate(data)

        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const user = await usersQueries.createQuery(data)

        if (user) {
            res.status(201).json(user)
        } else {
            res.status(500).json({
                message: `Faile to create a user`,
            })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { firstName, lastName, username, age, gender } = req.body
        const data = {
            firstName,
            lastName,
            username,
            age,
            gender,
        }

        data.age = Number(data.age)

        const isUserValid = validateUpdate(data)

        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const updatedUser = await usersQueries.updateOneQuery({ id }, data)
        if (updatedUser) {
            res.status(200).json({
                message: `User updated with ID: ${user.id}`,
                updatedUser,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },
    updateEmail: async (req, res) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const { email } = req.body
        const data = {
            email,
        }

        const isUserValid = validateUpdateEmail(data)

        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }
        const updatedUser = await usersQueries.updateOneQuery({ id }, data)
        if (updatedUser) {
            res.status(200).json({
                message: `User updated with ID: ${user.id}`,
                data: updatedUser,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },
    updatePassword: async (req, res) => {
        const id = req.params.id
        const { session, user } = req
        if (user.id !== id) {
            return res.status(401).json({
                message: `You are not authorized to update this user`,
            })
        }

        const currentUser = await usersQueries.findOneQuery(
            { id },
            [],
            ["passwordHash", "passwordSalt"]
        )
        if (!currentUser) {
            return res.status(404).json({
                message: `User not found with ID: ${id}`,
            })
        }

        const { password, newPassword } = req.body
        const data = {
            password,
            newPassword,
            passwordHash: null,
            passwordSalt: null,
        }

        let isUserValid = validateUpdatePassword({
            ...data,
            passwordHash: currentUser.passwordHash,
            passwordSalt: currentUser.passwordSalt,
        })
        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const newHashedPassword = genPassword(data.newPassword)
        data.passwordHash = newHashedPassword.hash
        data.passwordSalt = newHashedPassword.salt

        isUserValid = validateUpdatePassword(data)
        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const isPasswordMatch = passwordMatch(
            data.password,
            currentUser.passwordHash,
            currentUser.passwordSalt
        )
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: `Password is incorrect`,
            })
        }

        data.password = data.newPassword
        const updatedUser = await usersQueries.updateOneQuery({ id }, data)
        if (updatedUser) {
            res.status(200).json({
                message: `User updated with ID: ${user.id}`,
                data: updatedUser,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        await usersQueries.deleteOneQuery({ id })
        res.status(200).json({ message: `User deleted with ID: ${id}` })
    },
}
