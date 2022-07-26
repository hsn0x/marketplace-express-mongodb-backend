import { faker } from "@faker-js/faker"
import {
    MarketModel,
    ProductModel,
    LikeModel,
    UserModel,
} from "../models/index.js"
import { randomNumber } from "../utils/index.js"
import { usersQueries } from "../queries/index.js"

export default {
    createFake: async (record) => {
        console.log(`Creating ${record} fake likes...`)

        const fakeLikes = []
        const users = await UserModel.find()
        const products = await ProductModel.find()
        const markets = await MarketModel.find()
        for (let index = 0; index < record; index++) {
            const randomUser = users[randomNumber(0, users.length - 1)]
            const randomProduct = products[randomNumber(0, products.length - 1)]
            const randomMarket = markets[randomNumber(0, markets.length - 1)]
            const likeProduct = new LikeModel({
                Product: randomProduct._id,
                User: randomUser._id,
            })
            const likeMarket = new LikeModel({
                Market: randomMarket._id,
                User: randomUser.id,
            })
            fakeLikes.push(likeProduct)
            fakeLikes.push(likeMarket)
            await usersQueries.findOneAndUpdate(
                { _id: randomUser._id },
                {
                    $push: {
                        Likes: [likeProduct._id, likeMarket._id],
                    },
                }
            )
        }

        await LikeModel.bulkSave(fakeLikes)

        console.log(`Creating ${record} fake likes... DONE`)
    },
}
