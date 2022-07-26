import { faker } from "@faker-js/faker"
import {
    MarketModel,
    ProductModel,
    FavoriteModel,
    UserModel,
} from "../models/index.js"
import { randomNumber } from "../utils/index.js"
import { usersQueries } from "../queries/index.js"

export default {
    createFake: async (record) => {
        console.log(`Creating ${record} fake favorites...`)

        const fakeFavorites = []
        const users = await UserModel.find()
        const products = await ProductModel.find()
        const markets = await MarketModel.find()
        for (let index = 0; index < record; index++) {
            const randomUser = users[randomNumber(0, users.length - 1)]
            const randomProduct = products[randomNumber(0, products.length - 1)]
            const randomMarket = markets[randomNumber(0, markets.length - 1)]
            const favoriteProduct = new FavoriteModel({
                Product: randomProduct._id,
                User: randomUser._id,
            })
            const favoriteMarket = new FavoriteModel({
                Market: randomMarket._id,
                User: randomUser.id,
            })
            fakeFavorites.push(favoriteProduct)
            fakeFavorites.push(favoriteMarket)
            await usersQueries.findOneAndUpdate(
                { _id: randomUser._id },
                {
                    $push: {
                        Favorites: [favoriteProduct._id, favoriteMarket._id],
                    },
                }
            )
        }

        await FavoriteModel.bulkSave(fakeFavorites)

        console.log(`Creating ${record} fake favorites... DONE`)
    },
}
