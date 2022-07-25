import {
    createReviewQuery,
    deleteReviewQuery,
    findAllReviewsBySearchQuery,
    findAllReviewsQuery,
    findOneReviewQuery,
    updateReviewQuery,
} from "../queries/reviews.js"
import {
    validateCreateReview,
    validateUpdateReview,
} from "../validation/Review.js"
export default {
    getReviews: async (request, response) => {
        const reviews = await findAllReviewsQuery()
        if (reviews) {
            response.status(200).json({
                message: `Reviews found`,
                reviews,
            })
        } else {
            response.status(404).json({ message: "No reviews found" })
        }
    },
    getReviewsBySearch: async (request, response) => {
        const query = request.params.query

        const reviews = await findAllReviewsBySearchQuery({ query })
        if (reviews) {
            return response.status(200).json({
                message: `Reviews found with query: ${query}, `,
                length: reviews.length,
                reviews,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Review not found with Query: ${query}` })
        }
    },
    getReviewById: async (request, response) => {
        const id = parseInt(request.params.id)
        const review = await findOneReviewQuery({ id })
        if (review) {
            response.status(200).json({
                message: `Review found with ID: ${id}`,
                review,
            })
        } else {
            response.status(404).json({
                message: `Review not found with ID: ${id}`,
            })
        }
    },
    getReviewByName: async (request, response) => {
        const slug = request.params.slug
        const review = await findOneReviewQuery({ slug })
        if (review) {
            response.status(200).json({
                message: `Review found with ID: ${slug}`,
                review,
            })
        } else {
            response.status(404).json({
                message: `Review not found with ID: ${slug}`,
            })
        }
    },

    createReview: async (request, response) => {
        const { session, user } = request

        const { rate, title, content, productId } = request.body
        const reviewData = {
            rate: parseInt(rate),
            title,
            content,
            productId: parseInt(productId),
            UserId: user.id,
        }

        const isReviewValid = validateCreateReview(reviewData)

        if (!isReviewValid.valid) {
            return response.status(400).json({
                message: "Invalid review data",
                errors: isReviewValid.errors,
            })
        }

        const createdReview = await createReviewQuery(reviewData)

        if (createdReview) {
            return response.status(201).json({
                message: `Review added with ID: ${createdReview.id}`,
                data: createdReview,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a review` })
        }
    },

    updateReview: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request

        const { rate } = request.body

        const reviewData = {
            rate: parseInt(rate),
            UserId: user.id,
        }

        const isReviewValid = validateUpdateReview(reviewData)

        if (!isReviewValid) {
            response.status(400).json({ message: "Review not updated" })
        }

        const updatedReview = await updateReviewQuery(reviewData, { id })

        if (updatedReview) {
            response.status(200).json({
                message: `Review updated with ID: ${updatedReview[0]?.id}`,
                data: updatedReview,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a review, ${id}`,
            })
        }
    },

    deleteReview: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteReviewQuery({ id })
        response.status(200).json({ message: `Review deleted with ID: ${id}` })
    },
}
