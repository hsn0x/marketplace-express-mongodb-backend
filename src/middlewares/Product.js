import { findOneProductQuery } from "../queries/products.js"

export default {
    isProductOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Products || !user.Products.length > 0) {
            return res.status(401).json({
                message: `You dont have any products`,
            })
        }

        const isProductOwner = user.Products.find(
            (product) => product.id === id
        )

        if (isProductOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the product`,
            })
        }
    },
}
