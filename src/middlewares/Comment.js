import { findOneCommentQuery } from "../queries/comments.js"
export default {
    isCommentUsernameTaken: async (req, res, next) => {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }

        const isCommentUsernameTaken = await findOneCommentQuery({ username })
        if (isCommentUsernameTaken) {
            return res.status(401).json({
                message: `Username ${username} is already taken`,
            })
        } else {
            return next()
        }
    },

    isCommentOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Comments || !user.Comments.length > 0) {
            return res.status(401).json({
                message: `You dont have any comments`,
            })
        }

        const isCommentOwner = user.Comments.find(
            (comment) => comment.id === id
        )

        if (isCommentOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the comment`,
            })
        }
    },
}
