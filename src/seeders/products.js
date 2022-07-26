import { faker } from "@faker-js/faker"
import {
    CategoryModel,
    CommentModel,
    ImageModel,
    MarketModel,
    ProductModel,
    ReviewModel,
    UserModel,
} from "../models/index.js"
import { randomNumber } from "../utils/index.js"
import slugify from "slugify"
import { productsQueries, usersQueries } from "../queries/index.js"
import axios from "axios"

export default {
    createFake: async (record) => {
        const fakeProducts = []
        const fakeProductImages = []
        const fakeProductReviews = []
        const fakeProductComments = []

        const categories = await CategoryModel.find({ type: "product" })
        const markets = await MarketModel.find()
        const users = await UserModel.find()

        for (let index = 0; index < record; index++) {
            const randomCategory =
                categories[randomNumber(0, categories.length - 1)]
            const randomMarket = markets[randomNumber(0, markets.length - 1)]
            const randomUser = users[randomNumber(0, users.length - 1)]

            const tempImages = []
            for (
                let imageIndex = 0;
                imageIndex < randomNumber(1, 3);
                imageIndex++
            ) {
                const url = faker.image.imageUrl(600, 400, "Business", true)
                const image = new ImageModel({
                    public_id: faker.random.word(),
                    url,
                })
                tempImages.push(image)
            }

            const tempReviews = []
            const tempComments = []

            for (let index = 0; index < randomNumber(10, 30); index++) {
                const review = new ReviewModel({
                    rate: randomNumber(1, 5),
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(10),

                    User: randomUser._id,
                })
                const comment = new CommentModel({
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(10),

                    User: randomUser._id,
                })

                await usersQueries.findOneAndUpdate(
                    { _id: randomUser._id },
                    {
                        $push: {
                            Reviews: review._id,
                            Comments: comment._id,
                        },
                    }
                )

                tempReviews.push(review)
                tempComments.push(comment)
            }

            const product = new ProductModel({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                about: faker.lorem.paragraph(40),
                price: faker.commerce.price(),
                quantity: randomNumber(1, 100),

                Categories: randomCategory._id,
                Market: randomMarket._id,
                User: randomUser._id,

                Images: tempImages.map((image) => image._id),

                Comments: tempComments.map((comment) => comment._id),
                Reviews: tempReviews.map((review) => review._id),
            })

            await usersQueries.findOneAndUpdate(
                { _id: randomUser._id },
                {
                    $push: {
                        Products: product._id,
                    },
                }
            )

            tempImages.forEach((image) => image.Products.push(product._id))

            tempComments.forEach((comment) => (comment.Product = product._id))
            tempReviews.forEach((review) => (review.Product = product._id))

            fakeProducts.push(product)
            fakeProductImages.push(...tempImages)
            fakeProductReviews.push(...tempReviews)
            fakeProductComments.push(...tempComments)
        }

        await ProductModel.bulkSave(fakeProducts)
        await ImageModel.bulkSave(fakeProductImages)
        await CommentModel.bulkSave(fakeProductComments)
        await ReviewModel.bulkSave(fakeProductReviews)
    },
}
