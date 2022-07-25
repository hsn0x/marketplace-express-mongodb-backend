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
    },
    { timestamps: true }
)

export default model("Video", schema)
