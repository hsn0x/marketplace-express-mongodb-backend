import { CategoryModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await CategoryModel.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await CategoryModel.count()
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
        const data = await CategoryModel.findById(id)
            .select(salt)
            .populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await CategoryModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await CategoryModel.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await CategoryModel.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const recordCreated = CategoryModel.create(data, options)
        return recordCreated
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await CategoryModel.updateOne(
            filter,
            data,
            options
        )
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await CategoryModel.deleteOne(filter, options)
        return recordDeleted
    },
}
