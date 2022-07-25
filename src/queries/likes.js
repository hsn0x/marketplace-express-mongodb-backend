import { LikeModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await LikeModel.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await LikeModel.count()
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
        const data = await LikeModel.findById(id)
            .select(salt)
            .populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await LikeModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await LikeModel.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await LikeModel.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const recordCreated = LikeModel.create(data, options)
        return recordCreated
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await LikeModel.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await LikeModel.deleteOne(filter, options)
        return recordDeleted
    },
}
