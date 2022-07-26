import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        public_id: {
            type: String,
        },
        url: {
            type: String,
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
        Review: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        Comment: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

export default model("Video", schema)
