import { LikeMiddleware } from "../middlewares/index.js"
import Product from "../models/Product.js"
import { likesQueries } from "../queries/index.js"
import { productsQueries } from "../queries/index.js"
import { LikeValidation } from "../validation/index.js"

export default {
    getAll: async (request, response) => {
        const likes = await findAllQuery()
        if (likes) {
            response.status(200).json({ likes })
        } else {
            response.status(404).json({ message: `Likes not found` })
        }
    },
    getAllBySearch: async (request, response) => {
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
    getById: async (request, response) => {
        const id = parseInt(request.params.id)
        const like = await findOneQuery({ id })
        if (like) {
            response.status(200).json({ like })
        } else {
            response
                .status(404)
                .json({ message: `Like not found with ID: ${id}` })
        }
    },
    getBySlug: async (request, response) => {
        const slug = request.params.slug
        const like = await findOneQuery({ slug })
        if (like) {
            response.status(200).json({ like })
        } else {
            response
                .status(404)
                .json({ message: `Like not found with Slug: ${slug}` })
        }
    },
    create: async (request, response, next) => {
        const { session, user } = request
        const { ProductId } = request.body
        const likeData = {
            UserId: user.id,
            ProductId,
        }

        // const isLikeValid = validateCreate(likeData);

        // if (!isLikeValid.valid) {
        //     return response.status(400).json({
        //         message: "Invalid like data",
        //         errors: isLikeValid.errors,
        //     });
        // }
        // const product = await findByPkQuery(likeData.ProductId);

        const createdLike = await createQuery(likeData)

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
    update: async (request, response, next) => {
        const x = await isExist(request, response, next)
        if (!x) {
            await create(request, response)
        } else {
            await remove(request, response)
        }
    },
    remove: async (request, response) => {
        const id = parseInt(request.params.id)
        await removeQuery({ id })
        return response
            .status(200)
            .json({ message: `Like deleted with ID: ${id}` })
    },
}
