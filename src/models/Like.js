import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema({}, { timestamps: true })

export default model("Like", schema)
