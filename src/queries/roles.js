import { Role } from "../models/index.js"

export default {
    findAllQuery: async (populate = [], salt = []) => {
        const roles = await Role.find().select(salt).populate(populate)
        return roles
    },
    findByIdQuery: async (id, populate = [], salt = []) => {
        const role = await Role.findById(id).select(salt).populate(populate)
        return role
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const role = await Role.findOne(filter).select(salt).populate(populate)
        return role
    },
    findByIdAndUpdate: async (id, data) => {
        const roleUpdated = await Role.findByIdAndUpdate(id, data)
        return roleUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const roleUpdated = await Role.findOneAndUpdate(filter, data)
        return roleUpdated
    },
    createQuery: async (data, options) => {
        const createdRole = await Role.create(data, options)
        return createdRole
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await Role.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteQuery: async (filter, options) => {
        const recordDeleted = await Role.deleteOne(filter, options)
        return recordDeleted
    },
}
