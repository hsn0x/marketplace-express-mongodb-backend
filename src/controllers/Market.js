import { marketsQueries } from "../queries/index.js"
import { MarketValidation } from "../validation/index.js"
export default {
    getAll: async (request, response) => {
        const markets = await findAllQuery()
        if (markets) {
            response.status(200).json({
                message: `Markets found`,
                markets,
            })
        } else {
            response.status(404).json({ message: "No markets found" })
        }
    },
    getAllBySearch: async (request, response) => {
        const query = request.params.query

        const markets = await findAllMarketsBySearchQuery({ query })
        if (markets) {
            return response.status(200).json({
                message: `Markets found with query: ${query}, `,
                length: markets.length,
                markets,
            })
        } else {
            return response
                .status(404)
                .json({ message: `Market not found with Query: ${query}` })
        }
    },
    getById: async (request, response) => {
        const id = parseInt(request.params.id)
        const market = await findOneQuery({ id })
        if (market) {
            response.status(200).json({
                message: `Market found with ID: ${id}`,
                market,
            })
        } else {
            response.status(404).json({
                message: `Market not found with ID: ${id}`,
            })
        }
    },
    getByName: async (request, response) => {
        const slug = request.params.slug
        const market = await findOneQuery({ slug })
        if (market) {
            response.status(200).json({
                message: `Market found with ID: ${slug}`,
                market,
            })
        } else {
            response.status(404).json({
                message: `Market not found with ID: ${slug}`,
            })
        }
    },

    create: async (request, response) => {
        const { session, user } = request

        const { name, username, title, description, about, CategoriesIds } =
            request.body
        const marketData = {
            name,
            username,
            title,
            description,
            about,
            UserId: user.id,
            CategoriesIds,
        }

        const isMarketValid = validateCreateMarket(marketData)

        if (!isMarketValid.valid) {
            return response.status(400).json({
                message: "Invalid market data",
                errors: isMarketValid.errors,
            })
        }

        const createdMarket = await createQuery(marketData)

        if (createdMarket) {
            return response.status(201).json({
                message: `Market added with ID: ${createdMarket.id}`,
                data: createdMarket,
            })
        } else {
            return response
                .status(500)
                .json({ message: `Faile to create a market` })
        }
    },
    update: async (request, response) => {
        const id = parseInt(request.params.id)
        const { session, user } = request

        const { name, username, about, title, description, CategoriesIds } =
            request.body

        const marketData = {
            name,
            username,
            title,
            description,
            about,
            CategoriesIds,
            UserId: user.id,
        }

        const isMarketValid = validateUpdateMarket(marketData)

        if (!isMarketValid) {
            response.status(400).json({ message: "Market not updated" })
        }

        const updatedMarket = await updateQuery(marketData, { id })

        if (updatedMarket) {
            response.status(200).json({
                message: `Market updated with ID: ${updatedMarket[0]?.id}`,
                data: updatedMarket,
            })
        } else {
            response.status(500).json({
                message: `Faile to update a market, ${id}`,
            })
        }
    },
    remove: async (request, response) => {
        const id = parseInt(request.params.id)
        await removeQuery({ id })
        response.status(200).json({ message: `Market deleted with ID: ${id}` })
    },
}
