import { getPagingData } from "../lib/handlePagination.js"
import { productsQueries } from "../queries/index.js"
import { ProductValidation } from "../validation/index.js"
export default {
    getAll: async (request, response) => {
        const { page, size } = request.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }
        const products = await productsQueries.findAllQuery(params)
        if (products) {
            response.status(200).json(products)
        } else {
            response.status(404).json({ message: `Products not found` })
        }
    },
    getAllBySearch: async (request, response) => {
        const query = request.params.query

        const products = await productsQueries.findAllProductsBySearchQuery({
            query,
        })
        if (products) {
            return response.status(200).json({
                message: `Products found with query: ${query}, `,
                length: products.length,
                products,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Product not found with Query: ${query}` })
        }
    },
    getAllBySearchWithFilters: async (request, response) => {
        const query = request.params.query
        const filters = {}
        filters.minPrice = Number(request.query.minPrice)
        filters.maxPrice = Number(request.query.maxPrice)
        filters.CategoriesIds = request.query.CategoriesIds?.map((ci) =>
            Number(ci)
        )

        const products =
            await productsQueries.findAllProductsBySearchQueryWithFilters({
                query,
                filters,
            })
        if (products) {
            return response.status(200).json({
                message: `Products found with query: ${query}, `,
                length: products.length,
                products,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Product not found with Query: ${query}` })
        }
    },
    getById: async (request, response) => {
        const id = parseInt(request.params.id)
        const product = await productsQueries.findOneQuery({ id })
        if (product) {
            response.status(200).json({ product })
        } else {
            response
                .status(404)
                .json({ message: `Product not found with ID: ${id}` })
        }
    },
    getBySlug: async (request, response) => {
        const slug = request.params.slug
        const product = await productsQueries.findOneQuery({ slug })
        if (product) {
            response.status(200).json({ product })
        } else {
            response
                .status(404)
                .json({ message: `Product not found with Slug: ${slug}` })
        }
    },
    create: async (request, response, next) => {
        const { session, user } = request
        const { title, description, price, quantity, MarketId, CategoriesIds } =
            request.body

        const productData = {
            title,
            description,
            price,
            quantity,
            MarketId,
            CategoriesIds,
            UserId: user.id,
        }

        const isProductValid = ProductValidation.validateCreate(productData)

        if (!isProductValid.valid) {
            return response.status(400).json({
                message: "Invalid product data",
                errors: isProductValid.errors,
            })
        }

        const createdProduct = await productsQueries.createQuery(productData)

        if (createdProduct) {
            return response.status(201).json({
                message: `Product created with ID: ${createdProduct.id}`,
                createdProduct,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a product` })
        }
    },
    update: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request

        const { title, description, price, quantity, MarketId, CategoriesIds } =
            request.body
        const productData = {
            title,
            description,
            price,
            quantity,
            MarketId,
            CategoriesIds,
            UserId: user.id,
        }

        const isProductValid =
            ProductValidation.validateUpdateProduct(productData)

        if (!isProductValid.valid) {
            return response.status(400).json({
                message: "Invalid product data",
                errors: isProductValid.errors,
            })
        }

        const updatedProduct = await productsQueries.updateQuery(productData, {
            id,
        })

        if (updatedProduct) {
            return response.status(200).json({
                message: `Product updated with ID: ${updatedProduct.id}`,
                updatedProduct,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to update a product` })
        }
    },
    remove: async (request, response) => {
        const id = parseInt(request.params.id)
        await productsQueries.deleteQuery({ id })
        response.status(200).json({ message: `Product deleted with ID: ${id}` })
    },
}
