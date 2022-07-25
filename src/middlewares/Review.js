import { findOneReviewQuery } from "../queries/reviews.js"

export default {
    isReviewUsernameTaken: async (req, res, next) => {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }

        const isReviewUsernameTaken = await findOneReviewQuery({ username })
        if (isReviewUsernameTaken) {
            return res.status(401).json({
                message: `Username ${username} is already taken`,
            })
        } else {
            return next()
        }
    },

    isReviewOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Reviews || !user.Reviews.length > 0) {
            return res.status(401).json({
                message: `You dont have any reviews`,
            })
        }

        const isReviewOwner = user.Reviews.find((review) => review.id === id)

        if (isReviewOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the review`,
            })
        }
    },
}
