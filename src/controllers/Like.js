import { isLikeExist } from "../middleware/Like.js"
import Product from "../models/Product.js"
import {
    createLikeQuery,
    deleteLikeQuery,
    findAllLikesQuery,
    findOneLikeQuery,
    updateLikeQuery,
    findAllLikesBySearchQuery,
    findByPkLikeQuery,
} from "../queries/likes.js"
import { findByPkProductQuery } from "../queries/products.js"
import { validateCreateLike, validateUpdateLike } from "../validation/Like.js"

export default {
    getLikes: async (request, response) => {
        const likes = await findAllLikesQuery()
        if (likes) {
            response.status(200).json({ likes })
        } else {
            response.status(404).json({ message: `Likes not found` })
        }
    },
    getLikesBySearch: async (request, response) => {
        const query = request.params.query

        const likes = await findAllLikesBySearchQuery({ query })
        if (likes) {
            return response.status(200).json({
                message: `Likes found with query: ${query}, `,
                length: likes.length,
                likes,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Like not found with Query: ${query}` })
        }
    },
    getLikeById: async (request, response) => {
        const id = parseInt(request.params.id)
        const like = await findOneLikeQuery({ id })
        if (like) {
            response.status(200).json({ like })
        } else {
            response
                .status(404)
                .json({ message: `Like not found with ID: ${id}` })
        }
    },
    getLikeBySlug: async (request, response) => {
        const slug = request.params.slug
        const like = await findOneLikeQuery({ slug })
        if (like) {
            response.status(200).json({ like })
        } else {
            response
                .status(404)
                .json({ message: `Like not found with Slug: ${slug}` })
        }
    },
    createLike: async (request, response, next) => {
        const { session, user } = request
        const { ProductId } = request.body
        const likeData = {
            UserId: user.id,
            ProductId,
        }

        // const isLikeValid = validateCreateLike(likeData);

        // if (!isLikeValid.valid) {
        //     return response.status(400).json({
        //         message: "Invalid like data",
        //         errors: isLikeValid.errors,
        //     });
        // }
        // const product = await findByPkProductQuery(likeData.ProductId);

        const createdLike = await createLikeQuery(likeData)

        if (createdLike) {
            return response.status(201).json({
                message: `Like created with ID: ${createdLike.id}`,
                createdLike,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a like` })
        }
    },
    updateLike: async (request, response, next) => {
        const x = await isLikeExist(request, response, next)
        if (!x) {
            await createLike(request, response)
        } else {
            await deleteLike(request, response)
        }
    },
    deleteLike: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteLikeQuery({ id })
        return response
            .status(200)
            .json({ message: `Like deleted with ID: ${id}` })
    },
}
