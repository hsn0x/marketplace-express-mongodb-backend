import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        public_id: {
            type: String,
        },
        version: {
            type: String,
        },
        signature: {
            type: String,
        },
        width: {
            type: String,
        },
        height: {
            type: String,
        },
        format: {
            type: String,
        },
        resource_type: {
            type: String,
        },
        created_at: {
            type: String,
        },
        bytes: {
            type: String,
        },
        type: {
            type: String,
        },
        url: {
            type: String,
        },
        secure_url: {
            type: String,
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

export default model("Avatar", schema)
