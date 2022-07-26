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
        content: {
            type: String,
            required: true,
        },

        Product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        Market: {
            type: Schema.Types.ObjectId,
            ref: "Market",
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

schema.index({
    title: "text",
    content: "text",
})

schema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true })
    next()
})

export default model("Comment", schema)
