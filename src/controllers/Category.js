import {
    createCategoryQuery,
    deleteCategoryQuery,
    findAllCategoriesQuery,
    findAllCategoriesWhereQuery,
    findOneCategoryQuery,
    updateCategoryQuery,
} from "../queries/categories.js"

import {
    validateCreateCategory,
    validateUpdateCategory,
} from "../validation/Category.js"

export default {
    getCategories: async (request, response) => {
        const categories = await findAllCategoriesQuery()
        if (categories) {
            response.status(200).json({
                message: `Categories found`,
                length: categories.length,
                categories,
            })
        } else {
            response.status(404).json({ message: "No categories found" })
        }
    },
    getCategoriesByType: async (request, response) => {
        const type = request.params.type
        const categories = await findAllCategoriesWhereQuery({ type })
        if (categories) {
            response.status(200).json({
                message: `Categories found`,
                length: categories.length,
                categories,
            })
        } else {
            response.status(404).json({ message: "No categories found" })
        }
    },
    getCategoryById: async (request, response) => {
        const id = parseInt(request.params.id)
        const category = await findOneCategoryQuery({ id })
        if (category) {
            response.status(200).json({
                message: `Category found with ID: ${id}`,
                category,
            })
        } else {
            response.status(404).json({
                message: `Category not found with ID: ${id}`,
            })
        }
    },
    getCategoryByName: async (request, response) => {
        const name = request.params.name
        const category = await findOneCategoryQuery({ name })
        if (category) {
            response.status(200).json({
                message: `Category found with ID: ${name}`,
                category,
            })
        } else {
            response.status(404).json({
                message: `Category not found with ID: ${name}`,
            })
        }
    },
    createCategory: async (request, response) => {
        const { session, user } = request
        const parentId = parseInt(request.body.parentId)

        const { name, description, type } = request.body
        const categoryData = {
            name,
            description,
            parentId,
            UserId: user.id,
            type,
        }

        const isCategoryValid = validateCreateCategory(categoryData)

        if (!isCategoryValid.valid) {
            return response.status(400).json({
                message: "Invalid category data",
                errors: isCategoryValid.errors,
            })
        }

        const createdCategory = await createCategoryQuery(categoryData)

        if (createdCategory) {
            return response.status(201).json({
                message: `Category added with ID: ${createdCategory.id}`,
                createdCategory,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a category` })
        }
    },
    updateCategory: async (request, response) => {
        const id = parseInt(request.params.id)
        const { name, username, about, title } = request.body

        const categoryData = {
            name,
            username,
            about,
            title,
        }

        const isCategoryValid = validateUpdateCategory(categoryData)

        if (!isCategoryValid) {
            response.status(400).json({ message: "Category not updated" })
        }

        const updatedCategory = await updateCategoryQuery(categoryData, { id })

        if (updatedCategory) {
            response.status(200).json({
                message: `Category updated with ID: ${updatedCategory[0]?.id}`,
                updatedCategory,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a category, ${id}`,
            })
        }
    },
    deleteCategory: async (request, response) => {
        const id = parseInt(request.params.id)
        await deleteCategoryQuery({ id })
        response
            .status(200)
            .json({ message: `Category deleted with ID: ${id}` })
    },
}
