import { faker } from "@faker-js/faker"
import {
    AvatarModel,
    CategoryModel,
    ImageModel,
    ProductModel,
} from "../models/index.js"
import slugify from "slugify"
import { randomNumber } from "../utils/index.js"

export const createFakeCategories = async (record) => {
    const fakeCategoriesImages = []
    const fakeCategoriesAvatars = []

    const fakeCategoriesLevelTypeProduct1 = []
    const fakeCategoriesLevelTypeProduct2 = []
    const fakeCategoriesLevelTypeProduct3 = []

    for (let index = 0; index < record; index++) {
        const image = new ImageModel({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        const avatar = new AvatarModel({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })

        fakeCategoriesImages.push(image)
        fakeCategoriesAvatars.push(avatar)

        const name = faker.random.word() + faker.random.word()
        const category = new CategoryModel({
            name,
            description: faker.lorem.sentence(),
            parentId: 0,
            UserId: 1,
            type: "product",

            Images: image._id,
            Avatars: avatar._id,
        })

        image.Categories.push(category._id)
        avatar.Categories.push(category._id)

        fakeCategoriesLevelTypeProduct1.push(category)
    }

    for (let index = 0; index < record; index++) {
        const image = new ImageModel({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        const avatar = new AvatarModel({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })

        fakeCategoriesImages.push(image)
        fakeCategoriesAvatars.push(avatar)

        const randomCategoryLevel1 =
            fakeCategoriesLevelTypeProduct1[
                randomNumber(0, fakeCategoriesLevelTypeProduct1.length - 1)
            ]
        const name = faker.random.word() + faker.random.word()
        const category = new CategoryModel({
            name,
            description: faker.lorem.sentence(),
            parentId: randomCategoryLevel1._id,
            UserId: 1,
            type: "product",
        })

        image.Categories.push(category._id)
        avatar.Categories.push(category._id)

        fakeCategoriesLevelTypeProduct2.push(category)
    }

    for (let index = 0; index < record; index++) {
        const image = new ImageModel({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        const avatar = new AvatarModel({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })

        fakeCategoriesImages.push(image)
        fakeCategoriesAvatars.push(avatar)

        const randomCategoryLevel2 =
            fakeCategoriesLevelTypeProduct2[
                randomNumber(0, fakeCategoriesLevelTypeProduct2.length - 1)
            ]

        const name = faker.random.word() + faker.random.word()
        const category = new CategoryModel({
            name,
            description: faker.lorem.sentence(),
            parentId: randomCategoryLevel2._id,
            UserId: 1,
            type: "product",
        })

        image.Categories.push(category._id)
        avatar.Categories.push(category._id)

        fakeCategoriesLevelTypeProduct3.push(category)
    }

    const fakeCategoriesLevelTypeMarket1 = []
    const fakeCategoriesLevelTypeMarket2 = []
    const fakeCategoriesLevelTypeMarket3 = []

    for (let index = 0; index < record; index++) {
        const image = new ImageModel({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        const avatar = new AvatarModel({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })

        fakeCategoriesImages.push(image)
        fakeCategoriesAvatars.push(avatar)

        const name = faker.random.word() + faker.random.word()
        const category = new CategoryModel({
            name,
            description: faker.lorem.sentence(),
            parentId: 0,
            UserId: 1,
            type: "market",
        })

        image.Categories.push(category._id)
        avatar.Categories.push(category._id)

        fakeCategoriesLevelTypeMarket1.push(category)
    }

    for (let index = 0; index < record; index++) {
        const image = new ImageModel({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        const avatar = new AvatarModel({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })

        fakeCategoriesImages.push(image)
        fakeCategoriesAvatars.push(avatar)

        const randomCategoryLevel1 =
            fakeCategoriesLevelTypeMarket1[
                randomNumber(0, fakeCategoriesLevelTypeMarket1.length - 1)
            ]
        const name = faker.random.word() + faker.random.word()
        const category = new CategoryModel({
            name,
            description: faker.lorem.sentence(),
            parentId: randomCategoryLevel1._id,
            UserId: 1,
            type: "market",
        })

        image.Categories.push(category._id)
        avatar.Categories.push(category._id)

        fakeCategoriesLevelTypeMarket2.push(category)
    }

    for (let index = 0; index < record; index++) {
        const image = new ImageModel({
            public_id: faker.random.word(),
            url: faker.image.image(),
        })

        const avatar = new AvatarModel({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        })

        fakeCategoriesImages.push(image)
        fakeCategoriesAvatars.push(avatar)

        const randomCategoryLevel2 =
            fakeCategoriesLevelTypeMarket2[
                randomNumber(0, fakeCategoriesLevelTypeMarket2.length - 1)
            ]

        const name = faker.random.word() + faker.random.word()
        const category = new CategoryModel({
            name,
            description: faker.lorem.sentence(),
            parentId: randomCategoryLevel2._id,
            UserId: 1,
            type: "market",
        })

        image.Categories.push(category._id)
        avatar.Categories.push(category._id)

        fakeCategoriesLevelTypeMarket3.push(category)
    }

    await CategoryModel.bulkSave(fakeCategoriesLevelTypeProduct1)
    await CategoryModel.bulkSave(fakeCategoriesLevelTypeProduct2)
    await CategoryModel.bulkSave(fakeCategoriesLevelTypeProduct3)

    await CategoryModel.bulkSave(fakeCategoriesLevelTypeMarket1)
    await CategoryModel.bulkSave(fakeCategoriesLevelTypeMarket2)
    await CategoryModel.bulkSave(fakeCategoriesLevelTypeMarket3)

    await ImageModel.bulkSave(fakeCategoriesImages)
    await AvatarModel.bulkSave(fakeCategoriesAvatars)
}
