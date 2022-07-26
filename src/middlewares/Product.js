import { ObjectId } from "mongodb"
import { productsQueries } from "../queries/index.js"

export default {
    isOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Products || !user.Products.length > 0) {
            return res.status(401).json({
                message: `You dont have any products`,
            })
        }

        const isOwner = user.Products.find((product) => product.id === id)

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the product`,
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
