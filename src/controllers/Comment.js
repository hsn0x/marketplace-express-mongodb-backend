import {
    createCommentQuery,
    deleteCommentQuery,
    findAllCommentsBySearchQuery,
    findAllCommentsQuery,
    findOneCommentQuery,
    updateCommentQuery,
} from "../queries/comments.js"
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js"

export default {
    getComments: async (request, response) => {
        const comments = await findAllCommentsQuery()
        if (comments) {
            response.status(200).json({
                message: `Comments found`,
                comments,
            })
        } else {
            response.status(404).json({ message: "No comments found" })
        }
    },
    getCommentsBySearch: async (request, response) => {
        const query = request.params.query

        const comments = await findAllCommentsBySearchQuery({ query })
        if (comments) {
            return response.status(200).json({
                message: `Comments found with query: ${query}, `,
                length: comments.length,
                comments,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Comment not found with Query: ${query}` })
        }
    },
    getCommentById: async (request, response) => {
        const id = parseInt(request.params.id)
        const comment = await findOneCommentQuery({ id })
        if (comment) {
            response.status(200).json({
                message: `Comment found with ID: ${id}`,
                comment,
            })
        } else {
            response.status(404).json({
                message: `Comment not found with ID: ${id}`,
            })
        }
    },
    getCommentByName: async (request, response) => {
        const slug = request.params.slug
        const comment = await findOneCommentQuery({ slug })
        if (comment) {
            response.status(200).json({
                message: `Comment found with ID: ${slug}`,
                comment,
            })
        } else {
            response.status(404).json({
                message: `Comment not found with ID: ${slug}`,
            })
        }
    },
    createComment: async (request, response) => {
        const { session, user } = request

        const { title, content, productId } = request.body
        const commentData = {
            title,
            content,
            productId: parseInt(productId),
            UserId: user.id,
        }

        const isCommentValid = validateCreateComment(commentData)

        if (!isCommentValid.valid) {
            return response.status(400).json({
                message: "Invalid comment data",
                errors: isCommentValid.errors,
            })
        }

        const createdComment = await createCommentQuery(commentData)

        if (createdComment) {
            return response.status(201).json({
                message: `Comment added with ID: ${createdComment.id}`,
                data: createdComment,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a comment` })
        }
    },
    updateComment: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request

        const { name, username, about, title, description, CategoriesIds } =
            request.body

        const commentData = {
            name,
            username,
            title,
            description,
            about,
            CategoriesIds,
            UserId: user.id,
        }

        const isCommentValid = validateUpdateComment(commentData)

        if (!isCommentValid) {
            response.status(400).json({ message: "Comment not updated" })
        }

        const updatedComment = await updateCommentQuery(commentData, { id })

        if (updatedComment) {
            response.status(200).json({
                message: `Comment updated with ID: ${updatedComment[0]?.id}`,
                data: updatedComment,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a comment, ${id}`,
            })
        }
    },
    deleteComment: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteCommentQuery({ id })
        response.status(200).json({ message: `Comment deleted with ID: ${id}` })
    },
}
