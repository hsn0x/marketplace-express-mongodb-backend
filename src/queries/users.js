import { getPagination, getPagingData } from "../lib/handlePagination.js"
import User from "../models/User.js"

export default {
    findAllQuery: async (populate = [], salt = [], { page, size }) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await User.find()
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await User.count()
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
        const data = await User.findById(id).populate(populate).select(salt)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await User.findOne(filter).populate(populate).select(salt)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await User.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await User.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const createdUser = User.create(data, options)
        return createdUser
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await User.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await User.deleteOne(filter, options)
        return recordDeleted
    },
}
