import { MarketModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await MarketModel.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await MarketModel.count()
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
        const data = await MarketModel.findById(id)
            .select(salt)
            .populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await MarketModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await MarketModel.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await MarketModel.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const recordCreated = MarketModel.create(data, options)
        return recordCreated
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await MarketModel.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await MarketModel.deleteOne(filter, options)
        return recordDeleted
    },
}
