import { ObjectId } from "mongodb"
import { FavoriteModel } from "../models/index.js"
import { favoritesQueries } from "../queries/index.js"

export default {
    isExist: async (req, res, next) => {
        const { session, user } = req
        const { Product, Market } = req.body

        if (Product) {
            const isExist = await FavoriteModel.findOne({
                Product,
                User: user.id,
            })

            if (isExist) {
                return next()
            }

            return res.status(401).json({
                message: `You did not favorited this`,
            })
        } else if (Market) {
            const isExist = await FavoriteModel.findOne({
                Market,
                User: user.id,
            })

            if (isExist) {
                return next()
            }

            return res.status(401).json({
                message: `You did not favorited this`,
            })
        } else {
            return res.status(400).json({
                message: `Invalid Request`,
            })
        }
    },

    isNotExist: async (req, res, next) => {
        const { session, user } = req
        const { Product, Market } = req.body

        if (Product) {
            const isExist = await FavoriteModel.findOne({
                Product,
                User: user.id,
            })

            if (!isExist) {
                return next()
            }

            return res.status(401).json({
                message: `You already favorited this`,
            })
        } else if (Market) {
            const isExist = await FavoriteModel.findOne({
                Market,
                User: user.id,
            })

            if (!isExist) {
                return next()
            }

            return res.status(401).json({
                message: `You already favorited this`,
            })
        } else {
            return res.status(400).json({
                message: `Invalid Request`,
            })
        }
    },

    isOwner: async (req, res, next) => {
        const id = req.params.id
        const { session, user } = req

        if (!user.Favorites || !user.Favorites.length > 0) {
            return res.status(401).json({
                message: `You dont have any records`,
            })
        }

        const record = await favoritesQueries.findByIdQuery(id)
        if (!record) {
            return res.status(404).json({
                message: `Record not found with ID: ${id}`,
            })
        }

        const isOwner = record.User._id == user.id

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the record`,
            })
        }
    },

    isIdValid: async (req, res, next) => {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" })
        }
        return next()
    },
}
