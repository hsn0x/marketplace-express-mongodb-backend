import { isVoteExist } from "../middleware/Vote.js"
import Product from "../models/Product.js"
import {
    createVoteQuery,
    deleteVoteQuery,
    findAllVotesQuery,
    findOneVoteQuery,
    updateVoteQuery,
    findAllVotesBySearchQuery,
    findByPkVoteQuery,
} from "../queries/votes.js"
import { findByPkProductQuery } from "../queries/products.js"
import { validateCreateVote, validateUpdateVote } from "../validation/Vote.js"

export default {
    getVotes: async (request, response) => {
        const votes = await findAllVotesQuery()
        if (votes) {
            response.status(200).json({ votes })
        } else {
            response.status(404).json({ message: `Votes not found` })
        }
    },
    getVotesBySearch: async (request, response) => {
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

    getVoteById: async (request, response) => {
        const id = parseInt(request.params.id)
        const vote = await findOneVoteQuery({ id })
        if (vote) {
            response.status(200).json({ vote })
        } else {
            response
                .status(404)
                .json({ message: `Vote not found with ID: ${id}` })
        }
    },
    getVoteBySlug: async (request, response) => {
        const slug = request.params.slug
        const vote = await findOneVoteQuery({ slug })
        if (vote) {
            response.status(200).json({ vote })
        } else {
            response
                .status(404)
                .json({ message: `Vote not found with Slug: ${slug}` })
        }
    },
    createVote: async (request, response, next) => {
        const { session, user } = request
        const { ProductId } = request.body
        const voteData = {
            UserId: user.id,
            ProductId,
        }

        // const isVoteValid = validateCreateVote(voteData);

        // if (!isVoteValid.valid) {
        //     return response.status(400).json({
        //         message: "Invalid vote data",
        //         errors: isVoteValid.errors,
        //     });
        // }
        // const product = await findByPkProductQuery(voteData.ProductId);

        const createdVote = await createVoteQuery(voteData)

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
    updateVote: async (request, response, next) => {
        const x = await isVoteExist(request, response, next)
        console.log({ x })
        if (!x) {
            await createVote(request, response)
        } else {
            await deleteVote(request, response)
        }
    },
    deleteVote: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteVoteQuery({ id })
        return response
            .status(200)
            .json({ message: `Vote deleted with ID: ${id}` })
    },
}
