import Vote from "../models/Vote.js"
import Product from "../models/Product.js"
import { findOneVoteQuery } from "../queries/votes.js"

export default {
    isVoteExist: async (req, res, next) => {
        const { session, user } = req
        const { ProductId } = req.body

        if (!ProductId) {
            return res.status(400).json({ message: "Product ID is Required" })
        }

        const isVoteExist = await Vote.findOne({
            where: {
                UserId: user.id,
            },
            include: [
                {
                    model: Product,
                    where: {
                        id: ProductId,
                    },
                },
            ],
        })

        if (isVoteExist) {
            return res.status(401).json({
                message: `You already voted this product`,
            })
        } else {
            return next()
        }
    },

    isVoteOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const isVoteOwner = await findOneVoteQuery({ id, userId: user.id })

        if (isVoteOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the vote`,
            })
        }
    },
}
