import {
    categoriesQueries,
    favoritesQueries,
    usersQueries,
} from "../queries/index.js"
import { FavoriteValidation } from "../validation/index.js"

export default {
    getById: async (req, res) => {
        const id = req.params.id
        const data = await favoritesQueries.findByIdQuery(id)
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: `Record not found with ID: ${id}`,
            })
        }
    },
    getBySlug: async (req, res) => {
        const slug = req.params.slug
        const data = await favoritesQueries.findOneQuery({ slug })
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: `Record not found with ID: ${slug}`,
            })
        }
    },

    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await favoritesQueries.findAllQuery({}, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getAllByFilters: async (req, res) => {
        const { page, size } = req.query
        const { query } = req.params
        const filter = { $text: { $search: query } }

        if (!query) {
            return res.status(400).json({ message: "Invalid Query" })
        }

        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await favoritesQueries.findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getAllBySearch: async (req, res) => {
        const { page, size } = req.query
        const { query } = req.params
        const filter = { $text: { $search: query } }
        if (!query) {
            return res.status(400).json({ message: "Invalid Query" })
        }
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await favoritesQueries.findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getAllByUserId: async (req, res) => {
        const UserId = req.params.id
        const { page, size } = req.query
        const filter = { UserId }
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await favoritesQueries.findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },

    create: async (req, res, next) => {
        const { session, user } = req

        const { Product, Market } = req.body
        const data = {
            User: user.id,
            Product,
            Market,
        }

        const isValid = FavoriteValidation.validateCreate(data)

        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid record data",
                errors: isValid.errors,
            })
        }

        const recordCreated = await favoritesQueries.createQuery(data)

        await usersQueries.findOneAndUpdate(
            { _id: user.id },
            {
                $push: {
                    Favorites: recordCreated._id,
                },
            }
        )

        if (recordCreated) {
            return res.status(201).json(recordCreated)
        } else {
            return res.status(500).json({ message: `Faile to create a record` })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { Product, Market } = req.body
        const data = {
            User: user.id,
            Product,
            Market,
        }

        const isValid = FavoriteValidation.validateUpdate(data)
        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid record data",
                errors: isValid.errors,
            })
        }

        const updatedRecord = await favoritesQueries.updateOneQuery(
            { _id: id },
            data
        )
        if (updatedRecord) {
            return res.status(200).json({
                message: `Record updated with ID: ${updatedRecord.id}`,
                data: updatedRecord,
            })
        } else {
            return res.status(500).json({
                message: `Faile to update a record, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = req.params.id
        await favoritesQueries.deleteOneQuery({ _id: id })
        res.status(200).json({ message: `Record deleted with ID: ${id}` })
    },
}
