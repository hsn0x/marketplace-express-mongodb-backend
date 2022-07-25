import Favorite from "../models/Favorite.js"
import Product from "../models/Product.js"
import { findOneFavoriteQuery } from "../queries/favorites.js"
export default {
    isFavoriteExist: async (req, res, next) => {
        const { session, user } = req
        const { ProductId } = req.body

        if (!ProductId) {
            return res.status(400).json({ message: "Product ID is Required" })
        }

        const isFavoriteExist = await Favorite.findOne({
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

        if (isFavoriteExist) {
            return res.status(401).json({
                message: `You already favorited this product`,
            })
        } else {
            return next()
        }
    },

    isFavoriteOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const isFavoriteOwner = await findOneFavoriteQuery({
            id,
            userId: user.id,
        })

        if (isFavoriteOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the favorite`,
            })
        }
    },
}
