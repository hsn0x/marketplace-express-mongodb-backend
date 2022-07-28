// Auth middleware

import { usersQueries } from "../queries/index.js"

export default {
    isAuth: async (req, res, next) => {
        const auth = req.isAuthenticated()
        if (auth) {
            return next()
        } else {
            res.status(401).json({
                isAuthenticated: req.isAuthenticated(),
                message: "You need to be logged in ",
            })
        }
    },
    isUserAuth: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req
        if (user.id !== id) {
            return res.status(401).json({
                isAuthenticated: req.isAuthenticated(),
                message: "You are not authorized to do this action",
            })
        } else {
            next()
        }
    },
    isUsernameTaken: async (req, res, next) => {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }

        const isUsernameTaken = await usersQueries.findOneQuery({
            username,
        })
        if (isUsernameTaken) {
            return res.status(401).json({
                message: `Username ${username} is already taken`,
            })
        } else {
            return next()
        }
    },
    isEmailExist: async (req, res, next) => {
        const { email } = req.body

        const isEmailExist = await usersQueries.findOneQuery({ email })
        if (isEmailExist) {
            return res.status(401).json({
                message: `User with email ${email} already exist`,
            })
        } else {
            return next()
        }
    },
    isAdmin: async (req, res, next) => {
        const auth = req.isAuthenticated()

        const roles = req.user.Roles
        if (auth) {
            const isAdmin =
                roles.length > 0 && roles.some((role) => role.name === "ADMIN")
            if (isAdmin) {
                return next()
            } else {
                return res.status(401).json({
                    message: "You need to be an admin to do this action",
                })
            }
        } else {
            return res.status(401).json({
                message: "You need to be logged in to do this action",
            })
        }
    },
    isModerator: async (req, res, next) => {
        const auth = req.isAuthenticated()

        const roleName = req.user.Roles[0].name
        const hasModeratorRole =
            roleName === "ADMIN" || roleName === "MODERATOR"

        if (auth && hasModeratorRole) {
            return next()
        } else {
            res.status(401).json({
                message: `Only ${[
                    "ADMIN",
                    "MODERATOR",
                ]} are authorized to view this resource`,
            })
        }
    },
    isGuest: (req, res, next) => {
        const auth = req.isAuthenticated()

        if (!auth) {
            return next()
        } else {
            res.status(401).json({
                message: "You are already logged in",
            })
        }
    },
}
