import { ObjectId } from "mongodb"
import { marketsQueries } from "../queries/index.js"

export default {
    isUsernameTaken: async (req, res, next) => {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }

        const isUsernameTaken = await marketsQueries.findOneQuery({ username })

        if (isUsernameTaken) {
            return res.status(401).json({
                message: `Username ${username} is already taken`,
            })
        } else {
            return next()
        }
    },

    isOwner: async (req, res, next) => {
        const id = req.params.id
        const { session, user } = req

        if (!user.Markets || !user.Markets.length > 0) {
            return res.status(401).json({
                message: `You dont have any records`,
            })
        }

        const record = await marketsQueries.findByIdQuery(id)
        if (!record) {
            return res.status(404).json({
                message: `Record not found with ID: ${id}`,
            })
        }

        const isOwner = record.User._id == user.id

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the record`,
            })
        }
    },
    isIdValid: async (req, res, next) => {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid  ID" })
        }
        return next()
    },
}
