import { ProductModel, CategoryModel } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async ({ page, size }) => {
        const { limit, offset } = getPagination(page, size)

        const products = await Product.scope("withAssociations").findAll({
            limit,
            offset,
        })
        const count = await Product.count()
        const { totalItems, totalPages, currentPage } = getPagingData(
            count,
            page,
            limit
        )
        return {
            totalItems,
            totalPages,
            currentPage,
            count,
            rows: products,
        }
    },
    findByPkQuery: async (id) => {
        const product = await Product.scope("withAssociations").findByPk(id)
        return product
    },
    findOneQuery: async (where) => {
        const product = await Product.scope("withAssociations").findOne({
            where,
        })
        return product
    },
    findAllProductsBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ title: { [Op.like]: `%${q}%` } }))

        const product = await Product.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return product
    },
    findAllProductsBySearchQueryWithFilters: async ({ query, filters }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ title: { [Op.like]: `%${q}%` } }))

        console.log(query, filters)
        const queryFilter = {
            [Op.or]: [...queries],
        }
        const priceFilter = {
            [Op.and]: [],
        }
        if (filters.minPrice) {
            priceFilter[Op.and].push({ price: { [Op.gte]: filters.minPrice } })
        }
        if (filters.maxPrice) {
            priceFilter[Op.and].push({ price: { [Op.lte]: filters.maxPrice } })
        }

        const categoryFilter = []
        if (filters.CategoriesIds) {
            categoryFilter.push({
                model: Category,
                where: {
                    id: filters.CategoriesIds,
                },
            })
        }

        const products = await Product.scope("withAssociations").findAll({
            where: {
                [Op.and]: [{ ...queryFilter }, { ...priceFilter }],
            },
            include: [...categoryFilter],
        })
        return products
    },
    createQuery: async (productData) => {
        const createdProduct = await Product.create(productData)
        console.log(createdProduct.id)
        productData.CategoriesIds.map(
            async (ci) => await createdProduct.addCategory(ci)
        )
        return createdProduct
    },
    updateQuery: async (productData, where) => {
        await Product.update(productData, { where })
        const updatedProduct = await Product.scope("withAssociations").findOne({
            where,
        })
        updatedProduct.categories.map(
            async (c) => await updatedProduct.removeCategory(c.id)
        )
        productData.CategoriesIds.map(
            async (ci) => await updatedProduct.addCategory(ci)
        )

        return updatedProduct
    },
    deleteQuery: async (where) => {
        const deletedProduct = await Product.destroy({
            where,
        })

        return deletedProduct
    },
}
