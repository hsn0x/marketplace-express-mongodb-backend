import { VoteMiddleware } from "../middlewares/index.js"
import { ProductModel } from "../models/index.js"
import { votesQueries, productsQueries } from "../queries/index.js"
import { VoteValidation } from "../validation/index.js"

export default {
    getAll: async (request, response) => {
        const votes = await findAllQuery()
        if (votes) {
            response.status(200).json({ votes })
        } else {
            response.status(404).json({ message: `Votes not found` })
        }
    },
    getAllBySearch: async (request, response) => {
        const query = request.params.query

        const votes = await findAllVotesBySearchQuery({ query })
        if (votes) {
            return response.status(200).json({
                message: `Votes found with query: ${query}, `,
                length: votes.length,
                votes,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Vote not found with Query: ${query}` })
        }
    },

    getById: async (request, response) => {
        const id = parseInt(request.params.id)
        const vote = await findOneQuery({ id })
        if (vote) {
            response.status(200).json({ vote })
        } else {
            response
                .status(404)
                .json({ message: `Vote not found with ID: ${id}` })
        }
    },
    getBySlug: async (request, response) => {
        const slug = request.params.slug
        const vote = await findOneQuery({ slug })
        if (vote) {
            response.status(200).json({ vote })
        } else {
            response
                .status(404)
                .json({ message: `Vote not found with Slug: ${slug}` })
        }
    },
    create: async (request, response, next) => {
        const { session, user } = request
        const { ProductId } = request.body
        const voteData = {
            UserId: user.id,
            ProductId,
        }

        // const isVoteValid = validateCreate(voteData);

        // if (!isVoteValid.valid) {
        //     return response.status(400).json({
        //         message: "Invalid vote data",
        //         errors: isVoteValid.errors,
        //     });
        // }
        // const product = await findByPkQuery(voteData.ProductId);

        const createdVote = await createQuery(voteData)

        if (createdVote) {
            return response.status(201).json({
                message: `Vote created with ID: ${createdVote.id}`,
                createdVote,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a vote` })
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
        await removeQuery({ id })
        return response
            .status(200)
            .json({ message: `Vote deleted with ID: ${id}` })
    },
}
