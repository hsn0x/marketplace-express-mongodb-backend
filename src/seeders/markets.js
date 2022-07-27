import { faker } from "@faker-js/faker"
import {
    AvatarModel,
    CategoryModel,
    CommentModel,
    ImageModel,
    MarketModel,
    ReviewModel,
    UserModel,
} from "../models/index.js"
import slugify from "slugify"
import { randomNumber } from "../utils/index.js"
import { marketsQueries, usersQueries } from "../queries/index.js"

export default {
    createFake: async (record) => {
        console.log(`Creating ${record} fake markets...`)

        const fakeMarkets = []
        const fakeMarketImages = []
        const fakeMarketAvatars = []
        const fakeMarketReviews = []
        const fakeMarketComments = []

        const categories = await CategoryModel.find({ type: "market" })
        const users = await UserModel.find()

        for (let index = 0; index < record; index++) {
            const randomCategory =
                categories[randomNumber(0, categories.length - 1)]
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

                await usersQueries.findOneAndUpdate(
                    { _id: randomUser._id },
                    {
                        $push: {
                            Images: image._id,
                        },
                    }
                )
                tempImages.push(image)
            }

            const tempAvatars = []
            for (
                let avatarIndex = 0;
                avatarIndex < randomNumber(1, 3);
                avatarIndex++
            ) {
                const url = faker.image.imageUrl(600, 400, "Business", true)
                const avatar = new AvatarModel({
                    public_id: faker.random.word(),
                    url,
                })
                await usersQueries.findOneAndUpdate(
                    { _id: randomUser._id },
                    {
                        $push: {
                            Avatars: avatar._id,
                        },
                    }
                )
                tempAvatars.push(avatar)
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

            const name = faker.random.word() + faker.random.word()
            const username = faker.random.word() + faker.random.word()

            const market = new MarketModel({
                name,
                username,
                title: faker.lorem.sentence(),
                about: faker.lorem.paragraph(),
                description: faker.commerce.productDescription(),

                Categories: randomCategory._id,
                User: randomUser._id,

                Images: tempImages.map((image) => image._id),
                Avatars: tempAvatars.map((avatar) => avatar._id),

                Comments: tempComments.map((comment) => comment._id),
                Reviews: tempReviews.map((review) => review._id),
            })

            await usersQueries.findOneAndUpdate(
                { _id: randomUser._id },
                {
                    $push: {
                        Markets: market._id,
                    },
                }
            )

            tempImages.forEach((image) => image.Markets.push(market._id))
            tempAvatars.forEach((avatar) => avatar.Markets.push(market._id))

            tempComments.forEach((comment) => (comment.Market = market._id))
            tempReviews.forEach((review) => (review.Market = market._id))

            fakeMarkets.push(market)

            fakeMarketImages.push(...tempImages)
            fakeMarketAvatars.push(...tempAvatars)

            fakeMarketReviews.push(...tempReviews)
            fakeMarketComments.push(...tempComments)

            await MarketModel.bulkSave(fakeMarkets)
            await ImageModel.bulkSave(fakeMarketImages)
            await AvatarModel.bulkSave(fakeMarketAvatars)
            await CommentModel.bulkSave(fakeMarketComments)
            await ReviewModel.bulkSave(fakeMarketReviews)
        }

        console.log(`Creating ${record} fake markets... DONE`)
    },
}
