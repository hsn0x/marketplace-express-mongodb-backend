import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        public_id: {
            type: STRING,
        },
        version: {
            type: STRING,
        },
        signature: {
            type: STRING,
        },
        width: {
            type: STRING,
        },
        height: {
            type: STRING,
        },
        format: {
            type: STRING,
        },
        resource_type: {
            type: STRING,
        },
        created_at: {
            type: STRING,
        },
        bytes: {
            type: STRING,
        },
        type: {
            type: STRING,
        },
        url: {
            type: TEXT,
        },
        secure_url: {
            type: STRING,
        },
        imageableId: { type: STRING },
        imageableType: { type: STRING },
    },
    { timestamps: true }
)

export default model("Category", schema)
