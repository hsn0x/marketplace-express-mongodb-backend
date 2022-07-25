import { findOneMarketQuery } from "../queries/markets.js"

export default {
    isMarketUsernameTaken: async (req, res, next) => {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }

        const isMarketUsernameTaken = await findOneMarketQuery({ username })
        if (isMarketUsernameTaken) {
            return res.status(401).json({
                message: `Username ${username} is already taken`,
            })
        } else {
            return next()
        }
    },

    isMarketOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Markets || !user.Markets.length > 0) {
            return res.status(401).json({
                message: `You dont have any markets`,
            })
        }

        const isMarketOwner = user.Markets.find((market) => market.id === id)

        if (isMarketOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the market`,
            })
        }
    },
}
