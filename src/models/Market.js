import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        title: {
            type: String,
        },
        about: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
)

schema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

export default model("Market", schema)
