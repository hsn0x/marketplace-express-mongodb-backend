import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
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

export default model("Vote", schema)
