import { getPagination, getPagingData } from "../lib/handlePagination.js"
import { RoleModel } from "../models/index.js"

export default {
    findAllQuery: async (populate = [], salt = []) => {
        const roles = await RoleModel.find().select(salt).populate(populate)
        return roles
    },
    findByIdQuery: async (id, populate = [], salt = []) => {
        const role = await RoleModel.findById(id)
            .select(salt)
            .populate(populate)
        return role
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const role = await RoleModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return role
    },
    findByIdAndUpdate: async (id, data) => {
        const roleUpdated = await RoleModel.findByIdAndUpdate(id, data)
        return roleUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const roleUpdated = await RoleModel.findOneAndUpdate(filter, data)
        return roleUpdated
    },
    createQuery: async (data, options) => {
        const createdRole = await RoleModel.create(data, options)
        return createdRole
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await RoleModel.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteQuery: async (filter, options) => {
        const recordDeleted = await RoleModel.deleteOne(filter, options)
        return recordDeleted
    },
}
