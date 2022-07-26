import { ObjectId } from "mongodb"
import { commentsQueries } from "../queries/index.js"

export default {
    isOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Comments || !user.Comments.length > 0) {
            return res.status(401).json({
                message: `You dont have any comments`,
            })
        }

        const isOwner = user.Comments.find((comment) => comment.id === id)

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the comment`,
            })
        }
    },

    isIdValid: async (req, res, next) => {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        return next()
    },
}
