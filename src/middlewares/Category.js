import { findOneCategoryQuery } from "../queries/categories.js"

export default {
    isCategoryExist: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const category = await findOneCategoryQuery({ id })
        if (category) {
            return next()
        } else {
            return res.status(404).json({
                message: `Category not found with ID: ${id}`,
            })
        }
    },

    isCategoryNameExist: async (req, res, next) => {
        const name = req.params.name
        const category = await findOneCategoryQuery({ name })
        if (category) {
            return next()
        } else {
            return res.status(404).json({
                message: `Category not found with ID: ${name}`,
            })
        }
    },
}
