import { LikeModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async () => {
        const likes = await Like.scope("withAssociations").findAll()
        return likes
    },
    findAllLikesBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

        const like = await Like.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return like
    },
    findByPkQuery: async (id) => {
        const like = await Like.scope("withAssociations").findByPk(id)
        return like
    },
    findOneQuery: async (where) => {
        const like = await Like.scope("withAssociations").findOne({ where })
        return like
    },

    createQuery: async (likeData) => {
        const product = await findByPkQuery(likeData.ProductId)

        const createdLike = await product.create({
            UserId: likeData.UserId,
        })
        return createdLike
    },

    updateQuery: async (likeData, where) => {},

    removeQuery: async (where) => {
        const deletedLike = await Like.destroy({
            where,
        })
        return deletedLike
    },
}
