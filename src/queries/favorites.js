import { FavoriteModel } from "../models/index.js"
import { productsQueries } from "./index.js"

export default {
    findAllQuery: async () => {
        const favorites = await Favorite.scope("withAssociations").findAll()
        return favorites
    },
    findAllFavoritesBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.favorite]: `%${q}%` } }))

        const favorite = await Favorite.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return favorite
    },
    findByPkQuery: async (id) => {
        const favorite = await Favorite.scope("withAssociations").findByPk(id)
        return favorite
    },
    findOneQuery: async (where) => {
        const favorite = await Favorite.scope("withAssociations").findOne({
            where,
        })
        return favorite
    },
    createQuery: async (favoriteData) => {
        const product = await findByPkQuery(favoriteData.ProductId)

        const createdFavorite = await product.create({
            UserId: favoriteData.UserId,
        })
        return createdFavorite
    },
    updateQuery: async (favoriteData, where) => {},
    deleteQuery: async (where) => {
        const deletedFavorite = await Favorite.destroy({
            where,
        })
        return deletedFavorite
    },
}
