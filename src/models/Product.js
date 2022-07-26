import slugify from "slugify"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },

        Market: {
            type: Schema.Types.ObjectId,
            ref: "Market",
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Image",
            },
        ],

        Comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        Reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        Categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
    },
    { timestamps: true }
)

schema.index({
    title: "text",
    description: "text",
})

schema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true })
    next()
})

export default model("Product", schema)
