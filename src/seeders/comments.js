import { faker } from "@faker-js/faker"
import {
    MarketModel,
    ProductModel,
    CommentModel,
    UserModel,
} from "../models/index.js"
import { randomNumber } from "../utils/index.js"
import { usersQueries } from "../queries/index.js"

export default {
    createFake: async (record) => {
        console.log(`Creating ${record} fake comments...`)

        const fakeComments = []
        const users = await UserModel.find()
        const products = await ProductModel.find()
        const markets = await MarketModel.find()
        for (let index = 0; index < record; index++) {
            const randomUser = users[randomNumber(0, users.length - 1)]
            const randomProduct = products[randomNumber(0, products.length - 1)]
            const randomMarket = markets[randomNumber(0, markets.length - 1)]
            const commentProduct = new CommentModel({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                Product: randomProduct._id,
                User: randomUser._id,
            })
            const commentMarket = new CommentModel({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                Market: randomMarket._id,
                User: randomUser.id,
            })
            fakeComments.push(commentProduct)
            fakeComments.push(commentMarket)
            await usersQueries.findOneAndUpdate(
                { _id: randomUser._id },
                {
                    $push: {
                        Comments: [commentProduct._id, commentMarket._id],
                    },
                }
            )
        }

        await CommentModel.bulkSave(fakeComments)

        console.log(`Creating ${record} fake comments... DONE`)
    },
}
