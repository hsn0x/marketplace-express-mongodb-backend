import { ResourceModel } from "../models/index.js"

export default {
    findAllQuery: async (populate = [], salt = []) => {
        const resources = await ResourceModel.find()
            .select(salt)
            .populate(populate)
        return resources
    },
    findByIdQuery: (id, populate = [], salt = []) => {
        const resource = ResourceModel.findById(id)
            .select(salt)
            .populate(populate)
        return resource
    },
    findOneQuery: (filter, populate = [], salt = []) => {
        const resource = ResourceModel.findOne(filter)
            .select(salt)
            .populate(populate)
        return resource
    },
    findOneResourceAndUpdate: async (filter, data) => {
        const updatedResource = await ResourceModel.findOneAndUpdate(
            filter,
            data
        )
        return updatedResource
    },

    createQuery: async (data, options) => {
        const createdResource = await ResourceModel.create(data, options)
        return createdResource
    },

    updateOneQuery: async (filter, data, options = {}) => {
        await ResourceModel.updateOne(filter, data, options)
    },

    deleteOneQuery: async (filter, options) => {
        await ResourceModel.deleteOne(filter, options)
    },
}
