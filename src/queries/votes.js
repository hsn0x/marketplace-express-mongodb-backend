import { Op } from "sequelize"
import { Vote, Product } from "../scopes/index.js"
import { findByPkProductQuery } from "./products.js"
export default {
    findAllVotesQuery: async () => {
        const votes = await Vote.scope("withAssociations").findAll()
        return votes
    },
    findAllVotesBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.vote]: `%${q}%` } }))

        const vote = await Vote.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return vote
    },
    findByPkVoteQuery: async (id) => {
        const vote = await Vote.scope("withAssociations").findByPk(id)
        return vote
    },
    findOneVoteQuery: async (where) => {
        const vote = await Vote.scope("withAssociations").findOne({ where })
        return vote
    },
    createVoteQuery: async (voteData) => {
        const product = await findByPkProductQuery(voteData.ProductId)

        const createdVote = await product.createVote({
            UserId: voteData.UserId,
        })
        return createdVote
    },
    updateVoteQuery: async (voteData, where) => {},
    deleteVoteQuery: async (where) => {
        const deletedVote = await Vote.destroy({
            where,
        })
        return deletedVote
    },
}
