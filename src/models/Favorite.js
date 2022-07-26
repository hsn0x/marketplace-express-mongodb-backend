import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema({
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
})

schema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

export default model("Favorite", schema)
