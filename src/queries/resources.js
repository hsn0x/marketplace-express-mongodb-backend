import { Resource } from "../models/index.js"

export default {
    findAllQuery: async (populate = [], salt = []) => {
        const resources = await Resource.find().select(salt).populate(populate)
        return resources
    },
    findByIdQuery: (id, populate = [], salt = []) => {
        const resource = Resource.findById(id).select(salt).populate(populate)
        return resource
    },
    findOneQuery: (filter, populate = [], salt = []) => {
        const resource = Resource.findOne(filter)
            .select(salt)
            .populate(populate)
        return resource
    },
    findOneResourceAndUpdate: async (filter, data) => {
        const updatedResource = await Resource.findOneAndUpdate(filter, data)
        return updatedResource
    },

    createQuery: async (data, options) => {
        const createdResource = await Resource.create(data, options)
        return createdResource
    },

    updateOneQuery: async (filter, data, options = {}) => {
        await Resource.updateOne(filter, data, options)
    },

    deleteOneQuery: async (filter, options) => {
        await Resource.deleteOne(filter, options)
    },
}
