import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        rate: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },

        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        Product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        Market: {
            type: Schema.Types.ObjectId,
            ref: "Market",
        },
    },
    { timestamps: true }
)

export default model("Review", schema)
