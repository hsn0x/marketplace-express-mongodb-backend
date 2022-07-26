import { faker } from "@faker-js/faker"
import { ImageModel } from "../models/index.js"

export default {
    createFake: async (record) => {
        const fakeImages = []
        for (let index = 0; index < record; index++) {
            fakeImages.push({
                url: faker.image.imageUrl(),
            })
        }

        await Image.bulkCreate(fakeImages)
        const image = await Image.create({
            url: "https://placekitten.com/408/287",
        })
        const comment = await image.create({
            title: "Awesome!",
            content: "Awesome!",
        })

        console.log(comment.commentableId === image.id) // true

        console.log(comment.commentableType) // "Image"
    },
}
