import { Op } from "sequelize"
import { Favorite, Product } from "../scopes/index.js"
import { findByPkProductQuery } from "./products.js"

export default {
    findAllFavoritesQuery: async () => {
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
    findByPkFavoriteQuery: async (id) => {
        const favorite = await Favorite.scope("withAssociations").findByPk(id)
        return favorite
    },
    findOneFavoriteQuery: async (where) => {
        const favorite = await Favorite.scope("withAssociations").findOne({
            where,
        })
        return favorite
    },
    createFavoriteQuery: async (favoriteData) => {
        const product = await findByPkProductQuery(favoriteData.ProductId)

        const createdFavorite = await product.createFavorite({
            UserId: favoriteData.UserId,
        })
        return createdFavorite
    },
    updateFavoriteQuery: async (favoriteData, where) => {},
    deleteFavoriteQuery: async (where) => {
        const deletedFavorite = await Favorite.destroy({
            where,
        })
        return deletedFavorite
    },
}
