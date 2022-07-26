import { FavoriteMiddleware } from "../middlewares/index.js"
import Product from "../models/Product.js"
import { favoritesQueries } from "../queries/index.js"
import { productsQueries } from "../queries/index.js"
import { FavoriteValidation } from "../validation/index.js"

export default {
    getAll: async (request, response) => {
        const favorites = await findAllQuery()
        if (favorites) {
            response.status(200).json({ favorites })
        } else {
            response.status(404).json({ message: `Favorites not found` })
        }
    },
    getAllBySearch: async (request, response) => {
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

    getById: async (request, response) => {
        const id = parseInt(request.params.id)
        const favorite = await findOneQuery({ id })
        if (favorite) {
            response.status(200).json({ favorite })
        } else {
            response
                .status(404)
                .json({ message: `Favorite not found with ID: ${id}` })
        }
    },
    getBySlug: async (request, response) => {
        const slug = request.params.slug
        const favorite = await findOneQuery({ slug })
        if (favorite) {
            response.status(200).json({ favorite })
        } else {
            response
                .status(404)
                .json({ message: `Favorite not found with Slug: ${slug}` })
        }
    },
    create: async (request, response, next) => {
        const { session, user } = request
        const { ProductId } = request.body
        const favoriteData = {
            UserId: user.id,
            ProductId,
        }

        // const isFavoriteValid = validateCreate(favoriteData);

        // if (!isFavoriteValid.valid) {
        //     return response.status(400).json({
        //         message: "Invalid favorite data",
        //         errors: isFavoriteValid.errors,
        //     });
        // }
        // const product = await findByPkQuery(favoriteData.ProductId);

        const createdFavorite = await favorites.createQuery(favoriteData)

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
    update: async (request, response, next) => {
        const x = await isExist(request, response, next)
        console.log({ x })
        if (!x) {
            await create(request, response)
        } else {
            await remove(request, response)
        }
    },
    remove: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteQuery({ id })
        return response
            .status(200)
            .json({ message: `Favorite deleted with ID: ${id}` })
    },
}
