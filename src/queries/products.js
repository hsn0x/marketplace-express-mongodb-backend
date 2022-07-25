import { ProductModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await ProductModel.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await ProductModel.count()
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
            rows,
        }
    },
    findByIdQuery: async (id, populate = [], salt = []) => {
        const data = await ProductModel.findById(id)
            .select(salt)
            .populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await ProductModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await ProductModel.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await ProductModel.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const recordCreated = ProductModel.create(data, options)
        return recordCreated
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await ProductModel.updateOne(
            filter,
            data,
            options
        )
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await ProductModel.deleteOne(filter, options)
        return recordDeleted
    },
}
