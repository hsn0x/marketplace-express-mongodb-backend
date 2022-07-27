import slugify from "slugify"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        about: {
            type: String,
        },

        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
        Avatars: [
            {
                type: Schema.Types.ObjectId,
                ref: "Avatar",
            },
        ],
        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],

        Comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        Reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],

        Categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],

        Likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
        Votes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Vote",
            },
        ],
        Favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: "Favorite",
            },
        ],
    },
    { timestamps: true }
)

schema.index({
    name: "text",
    username: "text",
    title: "text",
})

schema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

export default model("Market", schema)
