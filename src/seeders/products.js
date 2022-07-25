import { faker } from "@faker-js/faker"
import { ImageModel, ProductModel } from "../models/index.js"
import { randomNumber } from "../utils/index.js"
import slugify from "slugify"
import { productsQueries } from "../queries/index.js"
import axios from "axios"

export const createFakeProducts = async (record) => {
    const fakeProducts = []
    for (let index = 0; index < record; index++) {
        fakeProducts.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            about: faker.lorem.paragraph(40),
            price: faker.commerce.price(),
            quantity: randomNumber(1, 100),
            CategoryId: randomNumber(1, record),
            MarketId: 1,
            UserId: randomNumber(1, record),
        })
    }

    const products = await Product.bulkCreate(fakeProducts)
    for (let productIndex = 0; productIndex < products.length; productIndex++) {
        const product = products[productIndex]

        for (
            let imageIndex = 0;
            imageIndex < randomNumber(1, 3);
            imageIndex++
        ) {
            const url = faker.image.imageUrl(600, 400, "Business", true)
            product.createImage({
                public_id: faker.random.word(),
                url,
            })
        }

        for (let index = 0; index < randomNumber(10, 30); index++) {
            await product.createReview({
                rate: randomNumber(1, 5),
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(10),
                UserId: randomNumber(1, record),
            })
            await product.create({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(10),
                UserId: randomNumber(1, record),
            })
        }

        await product.addCategory(productIndex)
    }
}
