import { faker } from "@faker-js/faker"
import { MarketModel } from "../models/index.js"
import slugify from "slugify"
import { randomNumber } from "../utils/index.js"
import { marketsQueries } from "../queries/index.js"

export const createFakeMarkets = async (record) => {
    const fakeMarkets = []
    for (let index = 0; index < record; index++) {
        const name =
            faker.random.word() + faker.random.word() + faker.random.word()
        const username =
            faker.random.word() + faker.random.word() + faker.random.word()
        fakeMarkets.push({
            name,
            username,
            title: faker.lorem.sentence(),
            about: faker.lorem.paragraph(),
            description: faker.commerce.productDescription(),
            UserId: randomNumber(1, record),
        })
    }

    const markets = await Market.bulkCreate(fakeMarkets)

    /**
     * Loop through all markets and create a fake image for each one
     * Loop through all markets and create a fake avatar for each one
     * Loop through all markets and create a fake category for each one
     */
    for (let marketIndex = 0; marketIndex < markets.length; marketIndex++) {
        const market = markets[marketIndex]

        /**
         * Create images for each market
         */
        for (
            let imageIndex = 0;
            imageIndex < randomNumber(1, 3);
            imageIndex++
        ) {
            const url = faker.image.imageUrl(1200, 800, "Business", true)
            market.createImage({
                public_id: faker.random.word(),
                url,
            })
        }

        /**
         * Create avatar for each market
         */
        await market.createAvatar({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(128, 128, "business", true),
        })

        /**
         * Add categorys to each market
         */

        await market.addCategory(marketIndex + record)
    }
}
