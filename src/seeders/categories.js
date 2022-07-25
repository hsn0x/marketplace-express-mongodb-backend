import { faker } from "@faker-js/faker"
import { CategoryModel, ProductModel } from "../models/index.js"
import slugify from "slugify"
import { randomNumber } from "../utils/index.js"

export const createFakeCategories = async (record) => {
    const fakeCategories = []
    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word()
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            parentId: 0,
            UserId: 1,
            type: "product",
        })
    }
    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word()
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            parentId: randomNumber(1, record),
            UserId: 1,
            type: "product",
        })
    }
    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word()
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            parentId: randomNumber(record, record * 2),
            UserId: 1,
            type: "product",
        })
    }

    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word()
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            parentId: 0,
            UserId: 1,
            type: "market",
        })
    }

    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word()
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            parentId: randomNumber(record * 3, record * 4),
            UserId: 1,
            type: "market",
        })
    }

    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word()
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            parentId: randomNumber(record * 4, record * 5),
            UserId: 1,
            type: "market",
        })
    }

    const categories = await Category.bulkCreate(fakeCategories)

    for (let index = 0; index < record; index++) {
        const category = categories[index]
        await category.createImage({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        await category.createAvatar({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })
    }
}
