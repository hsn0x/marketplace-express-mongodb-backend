import { faker } from "@faker-js/faker"
import {
    MarketModel,
    ProductModel,
    VoteModel,
    UserModel,
} from "../models/index.js"
import { randomNumber } from "../utils/index.js"
import { usersQueries } from "../queries/index.js"

export default {
    createFake: async (record) => {
        console.log(`Creating ${record} fake votes...`)

        const fakeVotes = []
        const users = await UserModel.find()
        const products = await ProductModel.find()
        const markets = await MarketModel.find()
        for (let index = 0; index < record; index++) {
            const randomUser = users[randomNumber(0, users.length - 1)]
            const randomProduct = products[randomNumber(0, products.length - 1)]
            const randomMarket = markets[randomNumber(0, markets.length - 1)]
            const voteProduct = new VoteModel({
                Product: randomProduct._id,
                User: randomUser._id,
            })
            const voteMarket = new VoteModel({
                Market: randomMarket._id,
                User: randomUser.id,
            })
            fakeVotes.push(voteProduct)
            fakeVotes.push(voteMarket)
            await usersQueries.findOneAndUpdate(
                { _id: randomUser._id },
                {
                    $push: {
                        Votes: [voteProduct._id, voteMarket._id],
                    },
                }
            )
        }

        await VoteModel.bulkSave(fakeVotes)

        console.log(`Creating ${record} fake votes... DONE`)
    },
}
