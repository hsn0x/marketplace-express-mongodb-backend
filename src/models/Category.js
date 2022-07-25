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
        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
        Avatars: [
            {
                type: Schema.Types.ObjectId,
                ref: "Avatar",
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
