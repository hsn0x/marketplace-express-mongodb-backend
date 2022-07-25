import { Op } from "sequelize"
import { Like, Product } from "../scopes/index.js"
import { findByPkProductQuery } from "./products.js"
export default {
    findAllLikesQuery: async () => {
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
    findByPkLikeQuery: async (id) => {
        const like = await Like.scope("withAssociations").findByPk(id)
        return like
    },
    findOneLikeQuery: async (where) => {
        const like = await Like.scope("withAssociations").findOne({ where })
        return like
    },

    createLikeQuery: async (likeData) => {
        const product = await findByPkProductQuery(likeData.ProductId)

        const createdLike = await product.createLike({
            UserId: likeData.UserId,
        })
        return createdLike
    },

    updateLikeQuery: async (likeData, where) => {},

    deleteLikeQuery: async (where) => {
        const deletedLike = await Like.destroy({
            where,
        })
        return deletedLike
    },
}
