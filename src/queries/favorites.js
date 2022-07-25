import { FavoriteModel } from "../models/index.js"
import { productsQueries } from "./index.js"
export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await FavoriteModel.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await FavoriteModel.count()
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
        const data = await FavoriteModel.findById(id)
            .select(salt)
            .populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await FavoriteModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await FavoriteModel.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await FavoriteModel.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const recordCreated = FavoriteModel.create(data, options)
        return recordCreated
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await FavoriteModel.updateOne(
            filter,
            data,
            options
        )
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await FavoriteModel.deleteOne(filter, options)
        return recordDeleted
    },
}
