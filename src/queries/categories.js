import { CategoryModel } from "../models/index.js"

export default {
    findAllQuery: async () => {
        const categories = await Category.scope("withAssociations").findAll()
        return categories
    },
    findAllCategoriesWhereQuery: async (where) => {
        const categories = await Category.scope("withAssociations").findAll({
            where,
        })
        return categories
    },
    findByPkCategoryQuery: async (id) => {
        const category = await Category.scope("withAssociations").findByPk(id)
        return category
    },
    findOneCategoryQuery: async (where) => {
        const category = await Category.scope("withAssociations").findOne({
            where,
        })
        return category
    },
    createQuery: async (categoryData) => {
        const createdCategory = await Category.create(categoryData)
        return createdCategory
    },

    updateQuery: async (categoryData, where) => {
        const updatedCategory = await Category.update(categoryData, { where })
        return updatedCategory
    },
    removeQuery: async (id) => {
        const deletedCategory = await Category.destroy({
            where: id,
        })
        return deletedCategory
    },
}
