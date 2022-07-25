import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema({})

schema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

export default model("Favorite", schema)
