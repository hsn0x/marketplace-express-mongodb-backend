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
    getUsers: async (request, response) => {
        const users = await findAllUsersQuery(true)
        if (users) {
            response.status(200).json({ users })
        } else {
            response.status(500).json({ message: `Faile to get users` })
        }
    },

    getUserById: async (request, response) => {
        const id = parseInt(request.params.id)
        const user = await findOneUserQuery({ id })
        if (user) {
            response.status(200).json({ user })
        } else {
            response
                .status(404)
                .json({ message: `User not found with ID: ${id}` })
        }
    },

    getUserByUsername: async (request, response) => {
        const username = request.params.username
        const user = await findOneUserQuery({ username })
        if (user) {
            response.status(200).json({ user })
        } else {
            response
                .status(404)
                .json({ message: `User not found with ID: ${username}` })
        }
    },

    getUserByEmail: async (request, response) => {
        const email = parseInt(request.params.email)
        const user = await findOneUserQuery({ email })
        if (user) {
            response.status(200).json({ user })
        } else {
            response.status(404).json({
                message: `User not found with email: ${email}`,
            })
        }
    },

    create: async (request, response, next) => {
        const {
            firstName,
            lastName,
            username,
            description,
            email,
            password,
            age,
            gender,
        } = request.body

        const userData = {
            firstName,
            lastName,
            username,
            description,
            email,
            password,
            gender,
        }
        userData.age = Number(age)

        const hashedPassword = genPassword(userData.password)
        userData.passwordHash = hashedPassword.hash
        userData.passwordSalt = hashedPassword.salt

        const isUserValid = validatecreate(userData)

        if (!isUserValid.valid) {
            return response.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const user = await createQuery(userData)

        if (user) {
            response.status(201).json({
                message: `User created with ID: ${user.id}`,
                user,
            })
        } else {
            response.status(500).json({
                message: `Faile to create a user`,
            })
        }
    },

    update: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request

        const { firstName, lastName, username, email, password, age, gender } =
            request.body
        const userData = {
            firstName,
            lastName,
            username,
            age,
            gender,
        }

        userData.age = Number(userData.age)

        const isUserValid = validateupdate(userData)

        if (!isUserValid.valid) {
            return response.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const updatedUser = await updateQuery(userData, { id })
        if (updatedUser) {
            response.status(200).json({
                message: `User updated with ID: ${user.id}`,
                updatedUser,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },

    updateEmail: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request

        const { email } = request.body
        const userData = {
            email,
        }

        const isUserValid = validateupdateEmail(userData)

        if (!isUserValid.valid) {
            return response.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }
        const updatedUser = await updateQuery(userData, { id })
        if (updatedUser) {
            response.status(200).json({
                message: `User updated with ID: ${user.id}`,
                data: updatedUser,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },

    updatePassword: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request
        if (user.id !== id) {
            return response.status(401).json({
                message: `You are not authorized to update this user`,
            })
        }

        const currentUser = await findOneUserQuery({ id }, false)
        if (!currentUser) {
            return response.status(404).json({
                message: `User not found with ID: ${id}`,
            })
        }

        const { password, newPassword } = request.body
        const userData = {
            password,
            newPassword,
        }

        /**
         * Check if the current password is valid
         */
        let isUserValid = validateupdatePassword({
            ...userData,
            passwordHash: currentUser.passwordHash,
            passwordSalt: currentUser.passwordSalt,
        })
        if (!isUserValid.valid) {
            return response.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const newHashedPassword = genPassword(userData.newPassword)
        userData.passwordHash = newHashedPassword.hash
        userData.passwordSalt = newHashedPassword.salt

        /**
         * Check if the current password is valid
         */
        isUserValid = validateupdatePassword(userData)
        if (!isUserValid.valid) {
            return response.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        /**
         * Check if the password is correct
         */

        const isPasswordMatch = passwordMatch(
            userData.password,
            currentUser.passwordHash,
            currentUser.passwordSalt
        )
        if (!isPasswordMatch) {
            return response.status(401).json({
                message: `Password is incorrect`,
            })
        }

        userData.password = userData.newPassword
        const updatedUser = await updateQuery(userData, { id })
        if (updatedUser) {
            response.status(200).json({
                message: `User updated with ID: ${user.id}`,
                data: updatedUser,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },

    remove: async (request, response) => {
        const id = parseInt(request.params.id)
        await removeQuery({ id })
        response.status(200).json({ message: `User deleted with ID: ${id}` })
    },
}
