import { Op } from "sequelize"
import { Comment, Product } from "../scopes/index.js"
import { findByPkProductQuery } from "./products.js"

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
    findByPkCommentQuery: async (id) => {
        const comment = await Comment.scope("withAssociations").findByPk(id)
        return comment
    },
    findOneCommentQuery: async (where) => {
        const comment = await Comment.scope("withAssociations").findOne({
            where,
        })
        return comment
    },
    createCommentQuery: async (commentData) => {
        const product = await findByPkProductQuery(commentData.productId)
        const createdComment = await product.createComment(commentData)
        const comment = await findByPkCommentQuery(createdComment.id)
        return comment
    },
    updateCommentQuery: async (commentData, where) => {
        await Comment.update(commentData, { where })
        const updatedComment = await Comment.scope("withAssociations").findOne({
            where,
        })
        return updatedComment
    },
    deleteCommentQuery: async (where) => {
        const deletedComment = await Comment.destroy({
            where,
        })
        return deletedComment
    },
}
