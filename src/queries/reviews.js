import { Op } from "sequelize"
import { Review } from "../scopes/index.js"
import { findByPkProductQuery } from "./products.js"

export default {
    findAllReviewsQuery: async () => {
        const reviews = await Review.scope("withAssociations").findAll()
        return reviews
    },
    findAllReviewsBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

        const review = await Review.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return review
    },
    findByPkReviewQuery: async (id) => {
        const review = await Review.scope("withAssociations").findByPk(id)
        return review
    },
    findOneReviewQuery: async (where) => {
        const review = await Review.scope("withAssociations").findOne({ where })
        return review
    },
    createReviewQuery: async (reviewData) => {
        const product = await findByPkProductQuery(reviewData.productId)
        const createdReview = await product.createReview(reviewData)
        const review = await findByPkReviewQuery(createdReview.id)
        return review
    },
    updateReviewQuery: async (reviewData, where) => {
        await Review.update(reviewData, { where })
        const updatedReview = await Review.scope("withAssociations").findOne({
            where,
        })
        return updatedReview
    },
    deleteReviewQuery: async (where) => {
        const deletedReview = await Review.destroy({
            where,
        })
        return deletedReview
    },
}
