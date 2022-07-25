import { Op } from "sequelize"
import { MarketModel } from "../models/index.js"

export default {
    findAllQuery: async () => {
        const markets = await Market.scope("withAssociations").findAll()
        return markets
    },
    findAllMarketsBySearchQuery: async ({ query }) => {
        const queries = query
            .trim()
            .split(" ")
            .filter((q) => q !== "")
            .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

        const market = await Market.scope("withAssociations").findAll({
            where: {
                [Op.or]: [...queries],
            },
        })
        return market
    },
    findByPkQuery: async (id) => {
        const market = await Market.scope("withAssociations").findByPk(id)
        return market
    },
    findOneQuery: async (where) => {
        const market = await Market.scope("withAssociations").findOne({ where })
        return market
    },
    createQuery: async (marketData) => {
        const createdMarket = await Market.create(marketData)
        marketData.CategoriesIds.map(
            async (ci) => await createdMarket.addCategory(ci)
        )
        return createdMarket
    },
    updateQuery: async (marketData, where) => {
        await Market.update(marketData, { where })
        const updatedMarket = await Market.scope("withAssociations").findOne({
            where,
        })
        updatedMarket.categories.map(
            async (c) => await updatedMarket.removeCategory(c.id)
        )
        marketData.CategoriesIds.map(
            async (ci) => await updatedMarket.addCategory(ci)
        )
        return updatedMarket
    },
    removeQuery: async (where) => {
        const deletedMarket = await Market.destroy({
            where,
        })
        return deletedMarket
    },
}
