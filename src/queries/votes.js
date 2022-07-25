import { VoteModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async () => {
        const votes = await VoteModel.scope("withAssociations").findAll()
        return votes
    },
    findAllVotesBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.vote]: `%${q}%` } }))

        const vote = await VoteModel.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return vote
    },
    findByPkQuery: async (id) => {
        const vote = await VoteModel.scope("withAssociations").findByPk(id)
        return vote
    },
    findOneQuery: async (where) => {
        const vote = await VoteModel.scope("withAssociations").findOne({
            where,
        })
        return vote
    },
    createQuery: async (voteData) => {
        const product = await findByPkQuery(voteData.ProductId)

        const createdVote = await product.create({
            UserId: voteData.UserId,
        })
        return createdVote
    },
    updateQuery: async (voteData, where) => {},
    removeQuery: async (where) => {
        const deletedVote = await VoteModel.destroy({
            where,
        })
        return deletedVote
    },
}
