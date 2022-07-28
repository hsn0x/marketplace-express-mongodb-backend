import { getPagination, getPagingData } from "../lib/handlePagination.js"
import { UserModel } from "../models/index.js"

export default {
    findAllQuery: async (populate = [], salt = [], { page, size }) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await UserModel.find()
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await UserModel.count()
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
        const data = await UserModel.findById(id)
            .populate(populate)
            .select(salt)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await UserModel.findOne(filter)
            .populate(populate)
            .select(salt)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await UserModel.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await UserModel.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const recordCreated = UserModel.create(data, options)
        return recordCreated
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await UserModel.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await UserModel.deleteOne(filter, options)
        return recordDeleted
    },
}
