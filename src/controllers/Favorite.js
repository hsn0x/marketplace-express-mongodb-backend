import { isFavoriteExist } from "../middleware/Favorite.js"
import Product from "../models/Product.js"
import {
    createFavoriteQuery,
    deleteFavoriteQuery,
    findAllFavoritesQuery,
    findOneFavoriteQuery,
    updateFavoriteQuery,
    findAllFavoritesBySearchQuery,
    findByPkFavoriteQuery,
} from "../queries/favorites.js"
import { findByPkProductQuery } from "../queries/products.js"
import {
    validateCreateFavorite,
    validateUpdateFavorite,
} from "../validation/Favorite.js"

export default {
    getFavorites: async (request, response) => {
        const favorites = await findAllFavoritesQuery()
        if (favorites) {
            response.status(200).json({ favorites })
        } else {
            response.status(404).json({ message: `Favorites not found` })
        }
    },
    getFavoritesBySearch: async (request, response) => {
        const query = request.params.query

        const favorites = await findAllFavoritesBySearchQuery({ query })
        if (favorites) {
            return response.status(200).json({
                message: `Favorites found with query: ${query}, `,
                length: favorites.length,
                favorites,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Favorite not found with Query: ${query}` })
        }
    },

    getFavoriteById: async (request, response) => {
        const id = parseInt(request.params.id)
        const favorite = await findOneFavoriteQuery({ id })
        if (favorite) {
            response.status(200).json({ favorite })
        } else {
            response
                .status(404)
                .json({ message: `Favorite not found with ID: ${id}` })
        }
    },
    getFavoriteBySlug: async (request, response) => {
        const slug = request.params.slug
        const favorite = await findOneFavoriteQuery({ slug })
        if (favorite) {
            response.status(200).json({ favorite })
        } else {
            response
                .status(404)
                .json({ message: `Favorite not found with Slug: ${slug}` })
        }
    },
    createFavorite: async (request, response, next) => {
        const { session, user } = request
        const { ProductId } = request.body
        const favoriteData = {
            UserId: user.id,
            ProductId,
        }

        // const isFavoriteValid = validateCreateFavorite(favoriteData);

        // if (!isFavoriteValid.valid) {
        //     return response.status(400).json({
        //         message: "Invalid favorite data",
        //         errors: isFavoriteValid.errors,
        //     });
        // }
        // const product = await findByPkProductQuery(favoriteData.ProductId);

        const createdFavorite = await createFavoriteQuery(favoriteData)

        if (createdFavorite) {
            return response.status(201).json({
                message: `Favorite created with ID: ${createdFavorite.id}`,
                createdFavorite,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a favorite` })
        }
    },
    updateFavorite: async (request, response, next) => {
        const x = await isFavoriteExist(request, response, next)
        console.log({ x })
        if (!x) {
            await createFavorite(request, response)
        } else {
            await deleteFavorite(request, response)
        }
    },
    deleteFavorite: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteFavoriteQuery({ id })
        return response
            .status(200)
            .json({ message: `Favorite deleted with ID: ${id}` })
    },
}
