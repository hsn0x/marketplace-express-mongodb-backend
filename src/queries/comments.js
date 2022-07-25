import { CommentModel } from "../models/index.js"
import { productsQueries } from "./index.js"

export default {
    findAllCommentsQuery: async () => {
        const comments = await Comment.scope("withAssociations").findAll()
        return comments
    },
    findAllCommentsBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

        const comment = await Comment.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return comment
    },
    findByPkQuery: async (id) => {
        const comment = await Comment.scope("withAssociations").findByPk(id)
        return comment
    },
    findOneQuery: async (where) => {
        const comment = await Comment.scope("withAssociations").findOne({
            where,
        })
        return comment
    },
    createQuery: async (commentData) => {
        const product = await findByPkQuery(commentData.productId)
        const createdComment = await product.create(commentData)
        const comment = await findByPkQuery(createdComment.id)
        return comment
    },
    updateQuery: async (commentData, where) => {
        await Comment.update(commentData, { where })
        const updatedComment = await Comment.scope("withAssociations").findOne({
            where,
        })
        return updatedComment
    },
    removeQuery: async (where) => {
        const deletedComment = await Comment.destroy({
            where,
        })
        return deletedComment
    },
}
