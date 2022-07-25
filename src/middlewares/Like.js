import Like from "../models/Like.js"
import Product from "../models/Product.js"
import { findOneLikeQuery } from "../queries/likes.js"

export default {
    isLikeExist: async (req, res, next) => {
        const { session, user } = req
        const { ProductId } = req.body

        if (!ProductId) {
            return res.status(400).json({ message: "Product ID is Required" })
        }

        const isLikeExist = await Like.findOne({
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

        if (isLikeExist) {
            return res.status(401).json({
                message: `You already liked this product`,
            })
        } else {
            return next()
        }
    },

    isLikeOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const isLikeOwner = await findOneLikeQuery({ id, userId: user.id })

        if (isLikeOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the like`,
            })
        }
    },
}
