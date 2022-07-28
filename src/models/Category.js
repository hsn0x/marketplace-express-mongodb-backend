import slugify from "slugify"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
        },
        parentId: {
            type: String,
        },
        type: {
            type: String,
        },

        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        Avatars: [
            {
                type: Schema.Types.ObjectId,
                ref: "Avatar",
            },
        ],
        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Image",
            },
        ],

        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        Markets: [
            {
                type: Schema.Types.ObjectId,
                ref: "Market",
            },
        ],
        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
)

schema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

export default model("Category", schema)
