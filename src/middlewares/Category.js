import { categoriesQueries } from "../queries/index.js"

export default {
    isExist: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const category = await categoriesQueries.findOneQuery({ id })
        if (category) {
            return next()
        } else {
            return res.status(404).json({
                message: `Category not found with ID: ${id}`,
            })
        }
    },

    isNameExist: async (req, res, next) => {
        const name = req.params.name
        const category = await categoriesQueries.findOneQuery({ name })
        if (category) {
            return next()
        } else {
            return res.status(404).json({
                message: `Category not found with ID: ${name}`,
            })
        }
    },
}
